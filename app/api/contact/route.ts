import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

/**
 * Contact form handler.
 *
 * On a valid submission it sends TWO emails via Resend:
 *   1. A notification to the team inbox (CONTACT_TO), with the visitor set as
 *      reply-to so you can reply directly.
 *   2. A confirmation/acknowledgement to the visitor who filled in the form.
 *
 * If RESEND_API_KEY is missing (e.g. a fresh checkout) it falls back to logging
 * so the form still works in development.
 *
 * Env (see .env.example):
 *   RESEND_API_KEY   - Resend API key
 *   CONTACT_TO       - inbox that receives enquiries
 *   CONTACT_FROM     - "From" header, must use a Resend-verified domain
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  companyName?: string;
  service?: string;
  message?: string;
  company_website?: string; // honeypot
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Shared email shell so both messages look on-brand. */
function shell(title: string, inner: string) {
  return `
  <div style="background:#f3f6fb;padding:32px 0;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;color:#0f1b2e">
      <div style="background:#060a13;color:#e9edf5;padding:22px 26px;border-radius:12px 12px 0 0">
        <div style="font-size:13px;letter-spacing:3px;color:#f5b942;text-transform:uppercase">ATS Group</div>
        <h2 style="margin:6px 0 0;font-size:19px">${title}</h2>
      </div>
      <div style="background:#ffffff;border:1px solid #e3e8ef;border-top:0;border-radius:0 0 12px 12px;padding:26px">
        ${inner}
      </div>
      <p style="text-align:center;color:#9aa7b4;font-size:12px;margin-top:18px">
        ATS Group · Tokyo, Japan · <a href="${siteConfig.url}" style="color:#9aa7b4">atsgroup.world</a>
      </p>
    </div>
  </div>`;
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without doing anything.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  const company = (data.companyName || "").trim() || "Not provided";
  const service = (data.service || "").trim() || "Not specified";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const receivedAt = new Date().toISOString();
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "akiraiwata304@gmail.com";
  const from =
    process.env.CONTACT_FROM || "ATS Group <noreply@atsgroup.world>";

  // Fallback: no key configured — log so nothing is lost in development.
  if (!apiKey) {
    console.log("[contact] (no RESEND_API_KEY) submission:", {
      name,
      email,
      company,
      service,
      message,
      receivedAt,
    });
    return NextResponse.json({ ok: true });
  }

  // ---- 1) Notification to the team -----------------------------------------
  const teamInner = `
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#5f6b78;width:120px">Name</td><td style="padding:6px 0;font-weight:bold">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 0;color:#5f6b78">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}" style="color:#1a56db">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#5f6b78">Company</td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>
      <tr><td style="padding:6px 0;color:#5f6b78">Topic</td><td style="padding:6px 0">${escapeHtml(service)}</td></tr>
    </table>
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e3e8ef">
      <div style="color:#5f6b78;font-size:13px;margin-bottom:8px">Message</div>
      <div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
    </div>
    <p style="color:#9aa7b4;font-size:12px;margin-top:18px">Received ${receivedAt}</p>`;

  const teamText =
    `New enquiry · ATS Group\n\n` +
    `Name:    ${name}\nEmail:   ${email}\nCompany: ${company}\nTopic:   ${service}\n\n` +
    `Message:\n${message}\n\nReceived ${receivedAt}`;

  // ---- 2) Confirmation to the visitor --------------------------------------
  const userInner = `
    <p style="font-size:15px;line-height:1.7;margin:0 0 14px">Hi ${escapeHtml(name)},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 14px">
      Thank you for reaching out to <strong>ATS Group</strong>. We've received your
      message and a member of our team will get back to you within one business day.
    </p>
    <div style="background:#f3f6fb;border:1px solid #e3e8ef;border-radius:10px;padding:14px 16px;margin:18px 0">
      <div style="color:#5f6b78;font-size:12px;margin-bottom:6px">Your message</div>
      <div style="white-space:pre-wrap;line-height:1.6;font-size:14px">${escapeHtml(message)}</div>
    </div>
    <p style="font-size:15px;line-height:1.7;margin:0 0 6px">
      Prefer to talk sooner? You can book a 30-minute call here:
    </p>
    <p style="margin:0 0 18px">
      <a href="${siteConfig.calendly}" style="display:inline-block;background:#f5b942;color:#1a1204;font-weight:bold;text-decoration:none;padding:10px 18px;border-radius:999px;font-size:14px">Book a call →</a>
    </p>
    <p style="font-size:14px;color:#5f6b78;line-height:1.7;margin:0">The ATS Group team<br/>Tokyo, Japan</p>`;

  const userText =
    `Hi ${name},\n\n` +
    `Thank you for reaching out to ATS Group. We've received your message and ` +
    `will get back to you within one business day.\n\n` +
    `Your message:\n${message}\n\n` +
    `Prefer to talk sooner? Book a call: ${siteConfig.calendly}\n\n` +
    `The ATS Group team\nTokyo, Japan`;

  try {
    const resend = new Resend(apiKey);

    // Team notification — this one must succeed.
    const teamRes = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: shell("New contact-form enquiry", teamInner),
      text: teamText,
    });

    if (teamRes.error) {
      console.error("[contact] team email error:", teamRes.error?.message || teamRes.error);
      return NextResponse.json(
        {
          error:
            "We couldn't send your message right now. Please try again, or book a call.",
        },
        { status: 502 }
      );
    }

    // Visitor confirmation — best-effort; don't fail the request if it bounces.
    const userRes = await resend.emails.send({
      from,
      to: email,
      replyTo: to,
      subject: "We've received your message · ATS Group",
      html: shell("Thanks for getting in touch", userInner),
      text: userText,
    });

    if (userRes.error) {
      console.error(
        "[contact] confirmation email error:",
        userRes.error?.message || userRes.error
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please try again, or book a call.",
      },
      { status: 502 }
    );
  }
}
