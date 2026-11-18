/**
 * Full-page screenshot of a scroll-animated site, via the Chrome DevTools
 * Protocol. No dependencies — Node 22+ has a global WebSocket.
 *
 *   node shoot.js <url> <outfile> [viewportW] [viewportH] [frames]
 *
 * With [frames], captures that many real-viewport screenshots down the page
 * instead of one tall image. Use it whenever the page has a `position: fixed`
 * background — see the note in the frame branch below.
 *
 * Why not `chrome --headless --screenshot`? Two reasons:
 *   - A tall --window-size makes every `100vh` block as tall as the window,
 *     so the layout you capture is not the layout anyone sees.
 *   - GSAP reveals start hidden and only fire once scrolled into view, so a
 *     single shot of an unscrolled page is mostly blank.
 *
 * So: keep a REAL viewport, scroll the whole page once to trigger every
 * reveal (they are `once: true`, so they stay visible), return to the top,
 * then capture beyond the viewport in one image.
 */

const fs = require("fs");
const { spawn } = require("child_process");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9222;
const [url, outfile, vwArg, vhArg, framesArg] = process.argv.slice(2);
const VW = Number(vwArg) || 1440;
const VH = Number(vhArg) || 900;
/** >0 = capture this many real-viewport frames instead of one tall image. */
const FRAMES = Number(framesArg) || 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(path) {
  const res = await fetch(`http://127.0.0.1:${PORT}${path}`);
  return res.json();
}

(async () => {
  const chrome = spawn(CHROME, [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--no-first-run",
    "--user-data-dir=" + process.env.TEMP + "/cdp-profile",
    "about:blank",
  ], { stdio: "ignore" });

  let target = null;
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(250);
    try {
      const list = await getJSON("/json/list");
      target = list.find((t) => t.type === "page");
    } catch { /* not up yet */ }
  }
  if (!target) { chrome.kill(); throw new Error("Chrome did not expose a debug target"); }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, { resolve, reject });
      ws.send(JSON.stringify({ id: n, method, params }));
    });

  const evaluate = async (expression) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true })).result.value;

  try {
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: VW, height: VH, deviceScaleFactor: 1, mobile: false,
    });

    await send("Page.navigate", { url });
    await sleep(3500); // fonts, hero intro timeline

    // Walk the whole page so every scroll-triggered reveal fires.
    const docHeight = await evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < docHeight; y += Math.floor(VH * 0.7)) {
      await evaluate(`window.scrollTo(0, ${y})`);
      await sleep(260);
    }
    await evaluate(`window.scrollTo(0, ${docHeight})`);
    await sleep(700);
    await evaluate("window.scrollTo(0, 0)");
    await sleep(2600); // let the scrubbed hero parallax settle all the way back

    const height = await evaluate("document.documentElement.scrollHeight");

    if (FRAMES) {
      // Frame mode: one shot per scroll position, each a real viewport.
      //
      // Needed whenever the page has a `position: fixed` background. In a
      // captureBeyondViewport shot a fixed element paints ONCE, at the top,
      // and everything below it shows bare page — which looks exactly like a
      // background that stops partway down. It is an artifact, not a bug, and
      // it will send you chasing a CSS problem that does not exist.
      const step = Math.max(1, Math.floor((height - VH) / Math.max(1, FRAMES - 1)));
      for (let i = 0; i < FRAMES; i++) {
        const y = Math.min(i * step, Math.max(0, height - VH));
        await evaluate(`window.scrollTo(0, ${y})`);
        await sleep(900);
        const f = await send("Page.captureScreenshot", { format: "png" });
        const name = outfile.replace(/\.png$/, `-${String(i).padStart(2, "0")}.png`);
        fs.writeFileSync(name, Buffer.from(f.data, "base64"));
        console.log(`  frame ${i} @ y=${y} -> ${name}`);
      }
      console.log(`captured ${FRAMES} frames of ${VW}x${VH} (page ${height}px)`);
    } else {
      const shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: VW, height, scale: 1 },
      });
      fs.writeFileSync(outfile, Buffer.from(shot.data, "base64"));
      console.log(`captured ${VW}x${height} -> ${outfile}`);
    }
  } finally {
    try { ws.close(); } catch {}
    try { await fetch(`http://127.0.0.1:${PORT}/json/close/${target.id}`); } catch {}
    chrome.kill();
  }
})().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
