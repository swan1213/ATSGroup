/**
 * Lightweight i18n dictionary.
 * English is the default; Japanese and Chinese are secondary languages.
 * Strings are consumed via the useT() hook (see components/LanguageProvider).
 * FAQ content lives separately in lib/faq.ts.
 */

export const locales = ["en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
  zh: "中文",
};

type Dict = {
  nav: { skills: string; why: string; approach: string; collaboration: string; team: string; faq: string; contact: string; company: string; news: string };
  news: {
    kicker: string; title: string; more: string;
    items: { date: string; cat: string; title: string }[];
  };
  company: {
    kicker: string; title: string;
    rows: { label: string; value: string }[];
  };
  hero: {
    eyebrow: string;
    l1: string; l2: string; l3a: string; em: string; l3b: string;
    lede: string;
    cta: string; secondary: string;
    stats: { dt: string; dd: string }[];
  };
  trust: { label: string; items: string[] };
  meaning: {
    kicker: string; title: string; sub: string;
    items: { num: string; word: string; body: string }[];
    triadsLabel: string;
    triads: { theme: string; words: string[] }[];
  };
  partner: {
    kicker: string; title: string; sub: string; motto: string;
    steps: { letter: string; word: string; body: string }[];
  };
  skills: {
    kicker: string; title: string; sub: string;
    items: { num: string; title: string; body: string; tags: string[]; alt: string }[];
  };
  experience: {
    kicker: string; title: string; sub: string; handleAll: string;
    items: { name: string; note: string }[];
  };
  results: {
    kicker: string; title: string; sub: string;
    intro: string[];
    prep: string; ramp: string; axisX: string; axisY: string; note: string;
    stats: { value: string; label: string }[];
  };
  why: {
    kicker: string; title: string; sub: string;
    blocks: { q: string; a: string; points: string[] }[];
  };
  approach: {
    kicker: string; title: string; sub_a: string; sub_em: string; sub_b: string;
    steps: { no: string; title: string; body: string }[];
  };
  stack: {
    kicker: string; title: string; sub: string;
    columns: { title: string; items: string[] }[];
  };
  collab: {
    kicker: string; title: string; lead: string;
    paras: string[]; noTech: string; revenue: string; meetingNote: string; closing: string; cta: string;
    slides: { alt: string; caption: string }[];
  };
  philosophy: { kicker: string; quote: string; paras: string[] };
  founders: {
    kicker: string; title: string; sub: string;
    people: { initials: string; name: string; role: string; bio: string; experience: string[] }[];
  };
  faqHead: { kicker: string; title: string; sub: string };
  contact: {
    kicker: string; title: string; sub: string;
    formTitle: string; formSub: string;
    name: string; namePh: string;
    email: string; emailPh: string;
    company: string; companyPh: string;
    help: string; helpPh: string; services: string[];
    message: string; messagePh: string;
    submit: string; submitting: string;
    successTitle: string; successBody: string; sendAnother: string;
    errorGeneric: string;
    fineprint: string;
    points: { label: string; value: string }[];
    bookingTitle: string; bookingSub: string; fallback: string; fallbackLink: string;
  };
  footer: { blurb: string; location: string; schedule: string; rights: string; tagline: string };
};

const en: Dict = {
  nav: { skills: "Services", why: "Why us", approach: "Approach", collaboration: "Partnership", team: "Founders", faq: "FAQ", contact: "Contact us", company: "Company", news: "News" },
  news: {
    kicker: "News", title: "Latest updates", more: "View all news",
    items: [
      { date: "2026.06.20", cat: "Notice", title: "ATS Group corporate website renewed." },
      { date: "2026.05.15", cat: "Project", title: "Aligner AI project is now underway." },
      { date: "2026.04.02", cat: "Service", title: "AI automation partnership program launched." },
      { date: "2026.02.10", cat: "Notice", title: "Now accepting partnership inquiries from the US and Canada." },
    ],
  },
  company: {
    kicker: "Company", title: "Company profile",
    rows: [
      { label: "Company name", value: "ATS Group" },
      { label: "Established", value: "2024" },
      { label: "Location", value: "Tokyo, Japan" },
      { label: "Representatives", value: "Daniel (Hiro Tanaka), Akira Iwata" },
      { label: "Business", value: "Full-stack development, AI automation, CMS & CRM solutions, AI training" },
      { label: "Languages", value: "English / 日本語 / 中文" },
    ],
  },
  hero: {
    eyebrow: "Tokyo, Japan",
    l1: "We build software", l2: "and the teams", l3a: "that ", em: "ship", l3b: " it.",
    lede:
      "ATS Group is a Tokyo-based engineering studio. We deliver production full-stack systems, AI automation, and the kind of hands-on training and partnership that turns an idea into something real.",
    cta: "Contact us", secondary: "Our skills",
    stats: [
      { dt: "10+ yrs", dd: "combined senior delivery" },
      { dt: "Full-stack", dd: "web, cloud, AI, automation" },
      { dt: "Worldwide", dd: "remote-friendly partnership" },
    ],
  },
  trust: {
    label: "Trusted across",
    items: ["Fintech", "SaaS", "E-commerce", "Healthcare", "Manufacturing", "EdTech"],
  },
  meaning: {
    kicker: "The name",
    title: "The three letters behind ATS.",
    sub: "Alliance, Technology, Success. We build long-term partnerships, back them with strong engineering, and measure ourselves by the revenue we help you earn.",
    items: [
      { num: "A", word: "Alliance", body: "We work as your partner, not a vendor. We share goals, risks and wins, and we grow together for the long term." },
      { num: "T", word: "Technology", body: "Software and AI that solve real business problems: cutting costs, opening new revenue streams and scaling what already works." },
      { num: "S", word: "Success", body: "Shared success measured in results: more customers, more revenue, more profit. When you grow, we grow." },
    ],
    triadsLabel: "Three letters, three promises.",
    triads: [
      { theme: "How we partner", words: ["Align", "Trust", "Share"] },
      { theme: "How we build", words: ["Automate", "Transform", "Scale"] },
      { theme: "What you gain", words: ["Advantage", "Traction", "Sustainable profit"] },
    ],
  },
  partner: {
    kicker: "How we partner",
    title: "Align. Trust. Share.",
    sub: "Our partnership model in three steps, built so both sides earn more together than either could alone.",
    steps: [
      { letter: "A", word: "Align", body: "We start with your business goals and revenue targets, then agree on scope, roles and what success looks like, before writing a line of code." },
      { letter: "T", word: "Trust", body: "Transparent progress, honest communication and senior engineers who deliver what they promise, sprint after sprint." },
      { letter: "S", word: "Share", body: "We share the risks and the rewards. As your product earns, we grow together, with long-term incentives that keep us invested in your results." },
    ],
    motto: "Aligned goals, earned trust, shared profit.",
  },
  skills: {
    kicker: "01 · Skills",
    title: "What we do, and do well.",
    sub: "Four core capabilities, one senior team, each built to grow your business.",
    items: [
      {
        num: "01", title: "Full-Stack Development",
        body: "End-to-end product engineering: clean APIs, considered front-ends, and infrastructure that holds up. From a blank repository to a system your team can own, we write code that still makes sense a year from now.",
        tags: ["Web apps", "APIs", "Cloud", "DevOps"],
        alt: "Code editor open on a laptop in a dark workspace",
      },
      {
        num: "02", title: "AI Automation",
        body: "We put AI to work on the things that quietly drain your week: support, data entry, reporting, routing. RAG pipelines, agents, and integrations that are evaluated, observable, and safe to run in production.",
        tags: ["LLM agents", "RAG", "Workflows", "Integrations"],
        alt: "3D AI lettering over a web of connected lines",
      },
      {
        num: "03", title: "CMS Solutions",
        body: "Content systems your marketing team will actually enjoy using. Headless or traditional, fast and SEO-ready, built so non-technical people can publish with confidence and never wait on a developer.",
        tags: ["Headless", "WordPress", "Sanity", "SEO"],
        alt: "Evening desk with monitors showing a website and its code",
      },
      {
        num: "04", title: "CRM Solutions",
        body: "Customer systems that fit how you actually sell and support, not the other way around. Clean pipelines, useful automation, and the integrations that keep your sales, ops, and data in sync.",
        tags: ["Sales pipelines", "Automation", "Integrations", "Dashboards"],
        alt: "Laptop showing a business analytics dashboard",
      },
    ],
  },
  experience: {
    kicker: "Track record",
    title: "Experience you can build on.",
    sub: "Real, ongoing work, delivered through sincere dedication and genuine, all-out effort.",
    handleAll: "From the first idea to launch and the years after, we handle the whole stack, so you are never left stitching vendors together.",
    items: [
      { name: "Outlier", note: "AI training & model evaluation (ongoing)" },
      { name: "Mercor", note: "AI talent & data projects (ongoing)" },
      { name: "Aligner", note: "AI alignment & data quality (ongoing)" },
      { name: "3 full-stack apps", note: "web platforms in active development" },
    ],
  },
  results: {
    kicker: "Proof",
    title: "From an idea to real revenue.",
    sub: "What collaboration, applied to a single idea, can actually produce.",
    intro: [
      "We put our work where our words are. The chart below tracks the average revenue generated per collaborating partner, starting from nothing more than an idea, our engineering, and a shared commitment to make it work.",
      "The first two months are preparation: research, building, and laying the foundation, with no revenue by design. From the third month real income begins, passing $4,000 per collaborator. By the tenth month it grows to more than $13,000.",
      "No technical background was required from our partners. These results came from the idea itself, a genuine spirit of collaboration, and the technology we built around it.",
    ],
    prep: "Preparation",
    ramp: "Revenue generation",
    axisX: "Month",
    axisY: "Revenue per partner (USD)",
    note: "Figures shown are per collaborating partner.",
    stats: [
      { value: "2 months", label: "preparation period" },
      { value: "$4K+", label: "by month 3" },
      { value: "$13K+", label: "by month 10" },
    ],
  },
  why: {
    kicker: "02 · Why us",
    title: "Why collaborate with ATS Group?",
    sub: "Not a vendor you brief and forget. A technology partner that thinks about your business the way you do.",
    blocks: [
      {
        q: "What makes ATS Group different?",
        a: "We start from your business, not from a stack of tools. Then we bring senior engineering and real AI experience to build something that scales with you.",
        points: ["Business-first thinking", "Long-term partnerships", "AI & automation expertise", "Modern technology stack", "Transparent communication", "Scalability & future growth"],
      },
      {
        q: "Why should businesses trust us?",
        a: "Trust is earned in how we deliver: predictably, with quality you can see, and support that does not disappear after launch.",
        points: ["Commitment to quality", "Reliable delivery process", "Focus on measurable results", "Technical excellence", "Long-term support"],
      },
      {
        q: "What partnerships are we looking for?",
        a: "We work best with people who think in years, not weeks. If you value a real relationship over a transaction, we should talk.",
        points: ["Business collaborations", "Strategic partnerships", "Technology partnerships", "Startup collaborations", "Enterprise projects", "Long-term client relationships"],
      },
      {
        q: "How do we approach collaboration?",
        a: "We listen first, agree on what success looks like, and keep you in the loop the whole way. Accountability runs both directions.",
        points: ["Understand business goals first", "Transparent communication", "Shared vision & accountability", "Continuous improvement", "Mutual growth & success"],
      },
      {
        q: "What values guide our work?",
        a: "The same principles guide every decision, whether anyone is watching or not.",
        points: ["Trust", "Integrity", "Innovation", "Accountability", "Long-term thinking", "Continuous learning"],
      },
    ],
  },
  approach: {
    kicker: "03 · Approach",
    title: "Craft over noise.",
    sub_a: "We believe in ", sub_em: "steady, deliberate improvement", sub_b: ", applied to how software gets made. Small steps, shipped often. Nothing goes out that we wouldn't run ourselves.",
    steps: [
      { no: "I", title: "Listen first", body: "We start with your constraints and your customers, not our favourite framework. The right tool is the one your team can live with." },
      { no: "II", title: "Build in the open", body: "Short cycles, visible progress, working software early. You see decisions as they happen, never a black box." },
      { no: "III", title: "Leave it better", body: "We hand over documented, tested systems, and the knowledge to run them. Our goal is to make ourselves optional." },
    ],
  },
  stack: {
    kicker: "04 · Stack",
    title: "The tools we reach for.",
    sub: "Pragmatic, proven, and chosen per project, never cargo-culted.",
    columns: [
      { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Vue", "Tailwind"] },
      { title: "Backend", items: ["Node.js", "Go", "Python", "PostgreSQL", "GraphQL"] },
      { title: "AI / Automation", items: ["Claude & OpenAI", "LangChain", "n8n / Zapier", "Vector DBs", "RAG"] },
      { title: "Cloud & Ops", items: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"] },
    ],
  },
  collab: {
    kicker: "05 · Partnership",
    title: "Built together, built to last.",
    lead: "We're genuinely excited to bring our expertise to the table and help turn your vision into something real.",
    paras: [
      "Every result we're proud of started the same way, with people who trusted one another and shared a clear goal. Projects always have their hard moments; what carries them through is steady communication, professionalism, and a real commitment to each other's success.",
      "To us, collaboration is more than working side by side. It's combining strengths, trading honest ideas, and opening doors none of us could reach alone. Good things get built through consistent effort and a genuine willingness to support the people around you.",
      "The partnerships we value most aren't about quick wins. They grow over time on a foundation of reliability, mutual respect, and shared long-term goals. When our partners and our team line up behind the same vision, the results tend to outlast the project itself.",
      "Right now we're looking to connect with professionals, founders, and business-minded people, especially across the United States and Canada, who value real, growth-oriented partnerships. Whether you're focused on expansion, new technology, or simply creating opportunities, we'd love to explore what we could build together.",
    ],
    noTech: "And you don't need to be technical to work with us. We bring the engineering and the AI know-how; what we ask for is openness, trust, and a real spirit of collaboration. That, more than anything, is what makes a partnership work.",
    revenue: "You also don't need a technical background to earn alongside us. Through referral and revenue-share partnerships, your network, market knowledge, and relationships can generate real income, while we quietly handle all of the technical delivery behind the scenes.",
    meetingNote: "In other words, even without expertise in the field, meaningful results and real revenue can come from working together. We'll walk you through exactly how it works during a short call.",
    closing: "Together, we can turn ideas into opportunities, and opportunities into something that lasts.",
    cta: "Start a conversation",
    slides: [
      { alt: "Two developers reviewing code together at a laptop", caption: "Shared goals, honest communication" },
      { alt: "A team working side by side around a shared table", caption: "Partnerships that grow over time" },
      { alt: "Two partners celebrating with a high five at a meeting", caption: "Trust first, everything follows" },
      { alt: "A team planning together at a whiteboard", caption: "Building something that lasts" },
    ],
  },
  philosophy: {
    kicker: "Our philosophy",
    quote: "Great achievements are rarely built alone. The strongest results come from trusted partnerships where ideas, expertise, and commitment work toward a shared vision.",
    paras: [
      "Meaningful success takes patience. The work that matters is rarely finished in a single sprint; it is built steadily, by people who keep showing up for one another.",
      "Strong partnerships are tested by the hard parts, not the easy ones. When something breaks or the plan changes, a real partner stays in the room and solves it with you.",
      "Trust is the foundation everything else rests on. Once it is there, decisions move faster, feedback gets honest, and the work gets noticeably better.",
      "Innovation rarely arrives from one mind in isolation. It grows when knowledge and experience are shared openly and people feel safe to try, question, and refine.",
      "Long-term thinking compounds. Choices made for the years ahead, rather than the next quarter, tend to create the bigger opportunities later.",
      "The best results come from rowing in the same direction. When goals are shared and the destination is clear, good teams find a way to reach it.",
    ],
  },
  founders: {
    kicker: "06 · Founders",
    title: "The people behind ATS.",
    sub: "Two founders, one standard: do honest work, build real relationships, and leave every project better than we found it.",
    people: [
      {
        initials: "HT",
        name: "Daniel (Hiro Tanaka)",
        role: "Co-Founder & CTO",
        bio: "Daniel leads engineering and applied AI at ATS Group. He has spent his career at the intersection of solid software and practical AI, architecting systems, mentoring engineers, and keeping delivery honest. He believes good technology is quiet: it works, it lasts, and it gets out of the way.",
        experience: [
          "10+ years building and scaling production software",
          "Full-stack & AI systems across fintech, SaaS and e-commerce",
          "Leads architecture, code quality and AI automation",
        ],
      },
      {
        initials: "AI",
        name: "Akira Iwata",
        role: "Co-Founder & CEO",
        bio: "Akira connects the engineering to the business, focusing on partnerships, client relationships, and making sure every project ladders up to a real outcome. The belief behind it is simple: technology only matters when it helps people and businesses move forward.",
        experience: [
          "Background in business strategy and operations",
          "Builds long-term client and partner relationships",
          "Drives growth, delivery and partnership across markets",
        ],
      },
    ],
  },
  faqHead: {
    kicker: "07 · FAQ",
    title: "Questions, answered straight.",
    sub: "The things partners and clients usually ask before we begin. If yours isn't here, just ask.",
  },
  contact: {
    kicker: "08 · Contact",
    title: "Let's build something that lasts.",
    sub: "Tell us what you're working on, or book a 30-minute call. No slide deck, just a straight conversation.",
    formTitle: "Send us a message",
    formSub: "We reply to every enquiry within one business day.",
    name: "Name *", namePh: "Your name",
    email: "Email *", emailPh: "you@company.com",
    company: "Company", companyPh: "Company (optional)",
    help: "How can we help?", helpPh: "Select a topic…",
    services: ["Full-Stack Development", "AI Automation", "CMS Solutions", "CRM Solutions", "Partnership / collaboration", "Something else"],
    message: "Message *", messagePh: "A few lines about your project, timeline, or goals…",
    submit: "Send message", submitting: "Sending…",
    successTitle: "Thank you, message received.",
    successBody: "We'll be in touch shortly. If it's urgent, feel free to book a call on the right.",
    sendAnother: "Send another",
    errorGeneric: "Something went wrong.",
    fineprint: "By sending this you agree to be contacted about your enquiry. We never share your details.",
    points: [
      { label: "Location", value: "Tokyo, Japan" },
      { label: "Response", value: "Within 1 business day" },
      { label: "Languages", value: "English / 日本語 / 中文" },
    ],
    bookingTitle: "Prefer to talk? Book a call",
    bookingSub: "Grab a 30-minute slot directly in our calendar.",
    fallback: "Trouble with the calendar? ",
    fallbackLink: "Open Calendly in a new tab →",
  },
  footer: {
    blurb: "Software engineering, AI automation & partnership, built in Tokyo.",
    location: "Tokyo, Japan",
    schedule: "Schedule a meeting →",
    rights: "All rights reserved.",
    tagline: "Dependable engineering, from Tokyo.",
  },
};

const ja: Dict = {
  nav: { skills: "事業内容", why: "選ばれる理由", approach: "私たちの流儀", collaboration: "パートナーシップ", team: "創業者", faq: "よくある質問", contact: "お問い合わせ", company: "会社概要", news: "お知らせ" },
  news: {
    kicker: "News", title: "お知らせ", more: "お知らせ一覧",
    items: [
      { date: "2026.06.20", cat: "お知らせ", title: "コーポレートサイトをリニューアルしました。" },
      { date: "2026.05.15", cat: "プロジェクト", title: "Aligner AI プロジェクトを開始しました。" },
      { date: "2026.04.02", cat: "サービス", title: "AI自動化パートナーシップ・プログラムを開始しました。" },
      { date: "2026.02.10", cat: "お知らせ", title: "米国・カナダからのパートナーシップのお問い合わせを受付開始しました。" },
    ],
  },
  company: {
    kicker: "Company", title: "会社概要",
    rows: [
      { label: "会社名", value: "ATS Group" },
      { label: "設立", value: "2024年" },
      { label: "所在地", value: "日本・東京" },
      { label: "代表者", value: "Daniel (Hiro Tanaka)、Akira Iwata" },
      { label: "事業内容", value: "フルスタック開発、AI自動化、CMS・CRM、AI研修" },
      { label: "対応言語", value: "English / 日本語 / 中文" },
    ],
  },
  hero: {
    eyebrow: "東京, 日本",
    l1: "ソフトウェアと、", l2: "それを動かす", l3a: "", em: "チーム", l3b: "をつくる。",
    lede:
      "ATS Group は東京を拠点とするエンジニアリングスタジオです。本番品質のフルスタック開発、AI自動化、そしてアイデアを形にする実践的な研修とパートナーシップを提供します。",
    cta: "お問い合わせ", secondary: "私たちのスキル",
    stats: [
      { dt: "10年以上", dd: "シニアによる開発実績" },
      { dt: "フルスタック", dd: "Web・クラウド・AI・自動化" },
      { dt: "世界中へ", dd: "リモート対応のパートナーシップ" },
    ],
  },
  trust: {
    label: "対応領域",
    items: ["フィンテック", "SaaS", "EC", "ヘルスケア", "製造業", "EdTech"],
  },
  meaning: {
    kicker: "社名の意味",
    title: "ATS が表す、3つの約束。",
    sub: "Alliance（提携）、Technology（技術）、Success（成功）。長期的なパートナーシップを築き、確かな技術で支え、お客様の収益への貢献で自らを評価します。",
    items: [
      { num: "A", word: "Alliance", body: "ベンダーではなくパートナーとして。目標もリスクも成果も共有し、長期的に共に成長します。" },
      { num: "T", word: "Technology", body: "現実のビジネス課題を解決するソフトウェアとAI。コストを削減し、新たな収益源を開き、うまくいっている仕組みをスケールさせます。" },
      { num: "S", word: "Success", body: "成果で測る、共有の成功。顧客が増え、売上が伸び、利益が上がる。お客様の成長が、私たちの成長です。" },
    ],
    triadsLabel: "3つの文字、3つの約束。",
    triads: [
      { theme: "組み方", words: ["Align", "Trust", "Share"] },
      { theme: "つくり方", words: ["Automate", "Transform", "Scale"] },
      { theme: "得られる成果", words: ["Advantage", "Traction", "Sustainable profit"] },
    ],
  },
  partner: {
    kicker: "パートナーシップの進め方",
    title: "Align. Trust. Share.",
    sub: "3つのステップで進めるパートナーシップ。どちらか一方では得られない収益を、共に生み出すための仕組みです。",
    steps: [
      { letter: "A", word: "Align", body: "まずお客様のビジネス目標と収益目標を理解し、スコープ・役割・成功の定義を、コードを書く前に合意します。" },
      { letter: "T", word: "Trust", body: "透明な進捗、誠実なコミュニケーション、そして約束を果たすシニアエンジニア。スプリントごとに信頼を積み重ねます。" },
      { letter: "S", word: "Share", body: "リスクも成果も共有します。プロダクトが収益を生むほど共に成長する、長期的なインセンティブで結果にコミットします。" },
    ],
    motto: "目標をそろえ、信頼を築き、利益を分かち合う。",
  },
  skills: {
    kicker: "01 · スキル",
    title: "得意なことを、確実に。",
    sub: "4つのコア領域を、ひとつのシニアチームで。すべてはビジネスの成長のために。",
    items: [
      {
        num: "01", title: "フルスタック開発",
        body: "エンドツーエンドのプロダクト開発。明快なAPI、考え抜かれたフロントエンド、長く耐えるインフラ。まっさらなリポジトリから、チームが運用できるシステムまで。一年後も理解できるコードを書きます。",
        tags: ["Webアプリ", "API", "クラウド", "DevOps"],
        alt: "暗いワークスペースのノートPCに開いたコードエディタ",
      },
      {
        num: "02", title: "AI自動化",
        body: "サポート、データ入力、レポート作成、振り分けなど、静かに時間を奪う業務をAIに任せます。評価され、観測でき、本番でも安全に動くRAGパイプライン・エージェント・連携を構築します。",
        tags: ["LLMエージェント", "RAG", "ワークフロー", "連携"],
        alt: "つながる線の上に浮かぶ立体的なAIの文字",
      },
      {
        num: "03", title: "CMS（コンテンツ管理）",
        body: "マーケティングチームが使っていて気持ちよいコンテンツ基盤。ヘッドレスでも従来型でも、速くSEOに強く、技術者でなくても安心して公開できる仕組みを。開発者を待つ必要はありません。",
        tags: ["ヘッドレス", "WordPress", "Sanity", "SEO"],
        alt: "Webサイトとコードを映すモニターが並ぶ夜のデスク",
      },
      {
        num: "04", title: "CRM（顧客管理）",
        body: "実際の営業・サポートの流れに合わせた顧客管理を。明快なパイプライン、役立つ自動化、そして営業・運用・データを同期させる連携を構築します。",
        tags: ["営業パイプライン", "自動化", "連携", "ダッシュボード"],
        alt: "ビジネス分析ダッシュボードを表示したノートPC",
      },
    ],
  },
  experience: {
    kicker: "実績",
    title: "積み重ねた経験を、土台に。",
    sub: "進行中の本物の仕事を、誠実な献身と全力の努力でお届けしています。",
    handleAll: "最初のアイデアからローンチ、その後の運用まで。技術全体を私たちが引き受けるので、複数のベンダーを取りまとめる必要はありません。",
    items: [
      { name: "Outlier", note: "AI研修・モデル評価（進行中）" },
      { name: "Mercor", note: "AI人材・データ案件（進行中）" },
      { name: "Aligner", note: "AIアライメント・データ品質（進行中）" },
      { name: "フルスタックアプリ 3件", note: "開発進行中のWebプラットフォーム" },
    ],
  },
  results: {
    kicker: "実証",
    title: "アイデアから、実際の収益へ。",
    sub: "ひとつのアイデアに協働を掛け合わせると、何が生まれるか。",
    intro: [
      "言葉だけではありません。下のグラフは、協働するパートナー一人あたりの平均収益の推移です。出発点は、ひとつのアイデアと、私たちのエンジニアリング、そしてやり遂げるという共有された覚悟だけでした。",
      "最初の2か月は準備期間です。リサーチ、構築、土台づくりに充て、意図的に収益はありません。3か月目から実際の収入が生まれ、パートナー一人あたり4,000ドルを超えます。10か月目には13,000ドル超まで成長します。",
      "パートナーに技術的な知識は不要でした。成果は、アイデアそのものと、本物の協働の精神、そしてその周りに私たちが築いた技術から生まれました。",
    ],
    prep: "準備期間",
    ramp: "収益創出",
    axisX: "月",
    axisY: "パートナーあたり収益（USD）",
    note: "数値は協働するパートナー一人あたりです。",
    stats: [
      { value: "2か月", label: "準備期間" },
      { value: "$4K+", label: "3か月目で" },
      { value: "$13K+", label: "10か月目で" },
    ],
  },
  why: {
    kicker: "02 · 選ばれる理由",
    title: "なぜ ATS Group と組むのか。",
    sub: "依頼して終わりのベンダーではありません。あなたと同じ目線でビジネスを考える、技術のパートナーです。",
    blocks: [
      {
        q: "ATS Group の違いは？",
        a: "私たちはツールありきではなく、あなたのビジネスから始めます。そこにシニアのエンジニアリングと実践的なAIの経験を持ち込み、共に成長できるものを築きます。",
        points: ["ビジネス起点の思考", "長期的なパートナーシップ", "AI・自動化の専門性", "モダンな技術スタック", "透明なコミュニケーション", "拡張性と将来の成長"],
      },
      {
        q: "なぜ信頼できるのか？",
        a: "信頼は、納品の仕方で築かれます。予測可能で、品質が目に見え、ローンチ後も消えないサポートを。",
        points: ["品質への責任", "信頼できる開発プロセス", "測定可能な成果への注力", "技術的な卓越性", "長期的なサポート"],
      },
      {
        q: "どんなパートナーを求めているか？",
        a: "週単位ではなく、年単位で考える方々と最も良い仕事ができます。取引より関係を大切にするなら、ぜひお話ししましょう。",
        points: ["ビジネス協業", "戦略的提携", "技術提携", "スタートアップとの協業", "エンタープライズ案件", "長期的な顧客関係"],
      },
      {
        q: "どう協働するのか？",
        a: "まず聴き、成功の定義を合意し、最後まで状況を共有します。説明責任は双方向です。",
        points: ["まずビジネス目標の理解", "透明なコミュニケーション", "共有するビジョンと責任", "継続的な改善", "相互の成長と成功"],
      },
      {
        q: "何を大切にしているか？",
        a: "見られていてもいなくても、同じ原則がすべての判断を導きます。",
        points: ["信頼", "誠実さ", "革新", "説明責任", "長期的な視点", "学び続ける姿勢"],
      },
    ],
  },
  approach: {
    kicker: "03 · 私たちの流儀",
    title: "ノイズより、技を。",
    sub_a: "私たちは", sub_em: "着実で意図的な改善", sub_b: "を信じ、それをソフトウェアづくりに適用します。小さく、こまめに届ける。自分たちで運用したくないものは、世に出しません。",
    steps: [
      { no: "I", title: "まず、聴く", body: "好きなフレームワークではなく、お客様の制約と顧客から始めます。正しい道具とは、チームが無理なく使えるものです。" },
      { no: "II", title: "オープンに作る", body: "短いサイクル、見える進捗、早い段階で動くソフトウェア。意思決定はその場で共有され、ブラックボックスにはなりません。" },
      { no: "III", title: "より良くして去る", body: "文書化・テスト済みのシステムと、それを運用する知識をお渡しします。私たちの目標は、自分たちを不要にすることです。" },
    ],
  },
  stack: {
    kicker: "04 · 技術スタック",
    title: "私たちが選ぶ道具。",
    sub: "実用的で、実績があり、プロジェクトごとに選定します。流行で選ぶことはありません。",
    columns: [
      { title: "フロントエンド", items: ["React", "Next.js", "TypeScript", "Vue", "Tailwind"] },
      { title: "バックエンド", items: ["Node.js", "Go", "Python", "PostgreSQL", "GraphQL"] },
      { title: "AI / 自動化", items: ["Claude & OpenAI", "LangChain", "n8n / Zapier", "ベクトルDB", "RAG"] },
      { title: "クラウド・運用", items: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"] },
    ],
  },
  collab: {
    kicker: "05 · パートナーシップ",
    title: "共に築き、長く続く。",
    lead: "私たちの専門性を活かし、あなたのビジョンを形にするお手伝いができることを、心から楽しみにしています。",
    paras: [
      "私たちが誇れる成果は、いつも同じ場所から始まりました。互いを信頼し、明確な目標を分かち合う人たちです。プロジェクトには必ず難しい局面があります。それを乗り越えるのは、絶え間ない対話、プロ意識、そして互いの成功への真の献身です。",
      "私たちにとって協働とは、ただ隣で働くこと以上のものです。強みを掛け合わせ、率直に意見を交わし、一人では届かない扉を開くこと。良いものは、地道な努力と、周囲を支えようとする誠実な姿勢から生まれます。",
      "私たちが最も大切にするパートナーシップは、目先の利益のためのものではありません。信頼、相互の敬意、そして共有された長期的な目標の上に、時間をかけて育っていきます。同じビジョンに向かうとき、成果はプロジェクトそのものよりも長く残ります。",
      "いま私たちは、本物の成長志向のパートナーシップを大切にする方々、特に米国とカナダの専門家・起業家・ビジネスに前向きな方々とのつながりを求めています。事業拡大、新しい技術、あるいは新たな機会づくり。何を目指す場合でも、一緒に何が築けるかをぜひ探らせてください。",
    ],
    noTech: "そして、私たちと組むのに技術的な知識は必要ありません。エンジニアリングとAIの知見は私たちが持ち込みます。お願いしたいのは、率直さ、信頼、そして本物の協働の精神だけ。それこそが、何よりもパートナーシップを成り立たせるものです。",
    revenue: "技術的なバックグラウンドがなくても、私たちと共に収益を生み出せます。紹介やレベニューシェアのパートナーシップを通じて、あなたの人脈・市場知識・関係性が実際の収入につながります。技術的な実装は、すべて私たちが裏側で引き受けます。",
    meetingNote: "つまり、その分野の専門知識がなくても、協働を通じて確かな成果と実際の収益が生まれます。仕組みの詳細は、短い打ち合わせで丁寧にご説明します。",
    closing: "共に、アイデアを機会へ。そして機会を、長く続くものへと変えていきましょう。",
    cta: "まずは話してみる",
    slides: [
      { alt: "ノートPCで一緒にコードを確認する開発者2人", caption: "共有する目標と、率直な対話" },
      { alt: "ひとつのテーブルを囲んで協働するチーム", caption: "時間をかけて育つパートナーシップ" },
      { alt: "ミーティングでハイタッチを交わすパートナー", caption: "まず信頼から、すべてが続く" },
      { alt: "ホワイトボードの前で計画を立てるチーム", caption: "長く続くものを築く" },
    ],
  },
  philosophy: {
    kicker: "私たちの哲学",
    quote: "大きな達成が、一人で成し遂げられることはめったにありません。最も強い成果は、アイデアと専門性と覚悟が同じビジョンに向かう、信頼に基づくパートナーシップから生まれます。",
    paras: [
      "意味のある成功には、忍耐が要ります。本当に大切な仕事は一度の短距離走で終わることは少なく、互いのために通い続ける人たちによって、着実に築かれます。",
      "強いパートナーシップは、順調なときではなく難所で試されます。何かが壊れ、計画が変わったとき、真のパートナーはその場に残り、共に解決します。",
      "信頼は、すべてが乗るための土台です。それがあれば、判断は速くなり、フィードバックは率直になり、仕事は目に見えて良くなります。",
      "革新が、孤立した一つの頭から生まれることはめったにありません。知識と経験がオープンに共有され、試し、問い、磨くことが安全だと感じられるときに育ちます。",
      "長期的な思考は、積み重なります。次の四半期ではなく、その先の数年のために下す選択が、後により大きな機会を生みます。",
      "最良の成果は、同じ方向に漕ぐことから生まれます。目標が共有され、行き先が明確なとき、良いチームは必ず到達する道を見つけます。",
    ],
  },
  founders: {
    kicker: "06 · 創業者",
    title: "ATS を支える人たち。",
    sub: "二人の創業者、ひとつの基準。誠実に働き、本物の関係を築き、すべてのプロジェクトを出会ったときより良くして去る。",
    people: [
      {
        initials: "HT",
        name: "Daniel (Hiro Tanaka)",
        role: "共同創業者 & CTO",
        bio: "Daniel は ATS Group のエンジニアリングと実用AIを統括します。堅実なソフトウェアと実践的なAIの交点でキャリアを重ね、システムを設計し、エンジニアを育て、誠実な開発を貫いてきました。良い技術は静かであるべきだ。動き、長持ちし、邪魔をしない。それが彼の信条です。",
        experience: [
          "本番ソフトウェアの構築・拡張に10年以上",
          "フィンテック・SaaS・ECでのフルスタック/AI開発",
          "アーキテクチャ・コード品質・AI自動化を統括",
        ],
      },
      {
        initials: "AI",
        name: "Akira Iwata",
        role: "共同創業者 & CEO",
        bio: "Akira はエンジニアリングとビジネスをつなぎます。パートナーシップと顧客との関係に注力し、すべてのプロジェクトが確かな成果に結びつくよう導きます。技術は人とビジネスを前進させてこそ意味がある。それが Akira の信条です。",
        experience: [
          "事業戦略とオペレーションの経験",
          "長期的な顧客・パートナー関係の構築",
          "市場をまたぐ成長・デリバリー・提携を推進",
        ],
      },
    ],
  },
  faqHead: {
    kicker: "07 · よくある質問",
    title: "率直にお答えします。",
    sub: "始める前に、パートナーやお客様からよくいただく質問です。見当たらないものは、お気軽にお尋ねください。",
  },
  contact: {
    kicker: "08 · お問い合わせ",
    title: "長く残るものを、一緒に。",
    sub: "取り組んでいることをお聞かせください。あるいは30分の通話をご予約を。資料は不要、率直にお話ししましょう。",
    formTitle: "メッセージを送る",
    formSub: "いただいたお問い合わせには、1営業日以内に返信します。",
    name: "お名前 *", namePh: "お名前",
    email: "メール *", emailPh: "you@company.com",
    company: "会社名", companyPh: "会社名（任意）",
    help: "ご相談内容", helpPh: "トピックを選択…",
    services: ["フルスタック開発", "AI自動化", "CMS（コンテンツ管理）", "CRM（顧客管理）", "パートナーシップ・協業", "その他"],
    message: "メッセージ *", messagePh: "プロジェクト、スケジュール、目標などを数行でお書きください…",
    submit: "送信する", submitting: "送信中…",
    successTitle: "ありがとうございます。受け付けました。",
    successBody: "まもなくご連絡します。お急ぎの場合は、右側から通話のご予約もどうぞ。",
    sendAnother: "もう一度送る",
    errorGeneric: "問題が発生しました。",
    fineprint: "送信することで、お問い合わせに関するご連絡に同意したものとみなします。お客様の情報を共有することはありません。",
    points: [
      { label: "所在地", value: "東京, 日本" },
      { label: "返信", value: "1営業日以内" },
      { label: "対応言語", value: "English / 日本語 / 中文" },
    ],
    bookingTitle: "話して決めたい方は、通話予約を",
    bookingSub: "カレンダーから30分の枠を直接ご予約いただけます。",
    fallback: "カレンダーが表示されませんか？ ",
    fallbackLink: "Calendly を新しいタブで開く →",
  },
  footer: {
    blurb: "ソフトウェア開発・AI自動化・パートナーシップを、東京から。",
    location: "東京, 日本",
    schedule: "ミーティングを予約 →",
    rights: "All rights reserved.",
    tagline: "確かなものづくりを、東京から。",
  },
};

const zh: Dict = {
  nav: { skills: "业务", why: "为何选择", approach: "我们的方式", collaboration: "合作伙伴", team: "创始人", faq: "常见问题", contact: "联系我们", company: "公司概要", news: "新闻" },
  news: {
    kicker: "News", title: "最新动态", more: "查看全部",
    items: [
      { date: "2026.06.20", cat: "公告", title: "企业官网全新改版上线。" },
      { date: "2026.05.15", cat: "项目", title: "Aligner AI 项目正式启动。" },
      { date: "2026.04.02", cat: "服务", title: "AI 自动化合作伙伴计划上线。" },
      { date: "2026.02.10", cat: "公告", title: "开始受理来自美国与加拿大的合作咨询。" },
    ],
  },
  company: {
    kicker: "Company", title: "公司概要",
    rows: [
      { label: "公司名称", value: "ATS Group" },
      { label: "成立", value: "2024年" },
      { label: "所在地", value: "日本·东京" },
      { label: "代表人", value: "Daniel (Hiro Tanaka)、Akira Iwata" },
      { label: "业务内容", value: "全栈开发、AI 自动化、CMS·CRM、AI 培训" },
      { label: "语言", value: "English / 日本語 / 中文" },
    ],
  },
  hero: {
    eyebrow: "日本 · 东京",
    l1: "我们打造软件，", l2: "也打造", l3a: "", em: "团队", l3b: "去交付它。",
    lede:
      "ATS Group 是一家位于东京的工程工作室。我们提供生产级的全栈开发、AI 自动化，以及把想法变为现实的实战培训与合作。",
    cta: "联系我们", secondary: "我们的技能",
    stats: [
      { dt: "10年+", dd: "资深交付经验" },
      { dt: "全栈", dd: "Web、云、AI、自动化" },
      { dt: "面向全球", dd: "远程友好的合作" },
    ],
  },
  trust: {
    label: "服务领域",
    items: ["金融科技", "SaaS", "电商", "医疗健康", "制造业", "教育科技"],
  },
  meaning: {
    kicker: "名字的含义",
    title: "ATS 背后的三个承诺。",
    sub: "Alliance（联盟）、Technology（技术）、Success（成功）。我们建立长期合作，以扎实的工程能力为支撑，并以帮助你创造的收益来衡量自己。",
    items: [
      { num: "A", word: "Alliance", body: "我们是你的伙伴，而非供应商。共享目标、风险与成果，长期共同成长。" },
      { num: "T", word: "Technology", body: "解决真实业务问题的软件与 AI：降低成本、开拓新的收入来源，并把行之有效的模式规模化。" },
      { num: "S", word: "Success", body: "以结果衡量的共同成功：更多客户、更多收入、更多利润。你成长，我们才成长。" },
    ],
    triadsLabel: "三个字母，三个承诺。",
    triads: [
      { theme: "如何合作", words: ["Align", "Trust", "Share"] },
      { theme: "如何构建", words: ["Automate", "Transform", "Scale"] },
      { theme: "你的收获", words: ["Advantage", "Traction", "Sustainable profit"] },
    ],
  },
  partner: {
    kicker: "我们如何合作",
    title: "Align. Trust. Share.",
    sub: "三步走的合作模式，让双方一起赚到单打独斗赚不到的收益。",
    steps: [
      { letter: "A", word: "Align", body: "先理解你的业务目标与收入目标，在写第一行代码之前，就范围、分工和成功标准达成一致。" },
      { letter: "T", word: "Trust", body: "透明的进度、坦诚的沟通，以及言出必行的资深工程师，每个迭代都在积累信任。" },
      { letter: "S", word: "Share", body: "共担风险，共享回报。产品越赚钱，我们一起成长；长期激励让我们始终专注于你的成果。" },
    ],
    motto: "目标一致，信任为本，利润共享。",
  },
  skills: {
    kicker: "01 · 技能",
    title: "我们擅长的，做到极致。",
    sub: "四项核心能力，一支资深团队，一切为了你的业务增长。",
    items: [
      {
        num: "01", title: "全栈开发",
        body: "端到端的产品工程：简洁的 API、用心的前端，以及稳定可靠的基础设施。从空白仓库到团队可自主运维的系统，我们写的代码一年后依然清晰易懂。",
        tags: ["Web 应用", "API", "云", "DevOps"],
        alt: "昏暗工作区里笔记本上打开的代码编辑器",
      },
      {
        num: "02", title: "AI 自动化",
        body: "让 AI 接手那些悄悄消耗你时间的工作：客服、数据录入、报表、分发。我们构建经过评估、可观测、可安全用于生产的 RAG 流水线、智能体与集成。",
        tags: ["LLM 智能体", "RAG", "工作流", "集成"],
        alt: "交织线条之上的立体 AI 字样",
      },
      {
        num: "03", title: "CMS 内容管理",
        body: "让市场团队真正乐于使用的内容系统。无头或传统架构，快速且利于 SEO，让非技术人员也能放心发布，无需等待开发人员。",
        tags: ["无头架构", "WordPress", "Sanity", "SEO"],
        alt: "夜晚书桌上显示网站与代码的显示器",
      },
      {
        num: "04", title: "CRM 客户管理",
        body: "贴合你真实销售与服务流程的客户系统，而非反过来。清晰的管线、实用的自动化，以及让销售、运营与数据保持同步的集成。",
        tags: ["销售管线", "自动化", "集成", "仪表盘"],
        alt: "显示商业分析仪表盘的笔记本电脑",
      },
    ],
  },
  experience: {
    kicker: "过往业绩",
    title: "可以依靠的经验。",
    sub: "正在进行的真实工作，以真诚的投入与全力以赴交付。",
    handleAll: "从最初的想法到上线，再到之后的多年运维，整套技术都由我们承担，你无需在多家供应商之间奔波。",
    items: [
      { name: "Outlier", note: "AI 培训与模型评估（进行中）" },
      { name: "Mercor", note: "AI 人才与数据项目（进行中）" },
      { name: "Aligner", note: "AI 对齐与数据质量（进行中）" },
      { name: "3 个全栈应用", note: "正在积极开发的 Web 平台" },
    ],
  },
  results: {
    kicker: "实证",
    title: "从一个想法，到真实的收益。",
    sub: "把协作用在一个想法上，究竟能产生什么。",
    intro: [
      "我们以行动印证承诺。下方图表展示了每位合作伙伴的平均收益变化，起点只是一个想法、我们的工程能力，以及把它做成的共同决心。",
      "前两个月是准备期：调研、构建、打基础，按设计没有收益。从第三个月起，真实收入开始出现，超过每位伙伴 4,000 美元。到第十个月，增长至 13,000 美元以上。",
      "合作伙伴无需任何技术背景。这些成果来自想法本身、真诚的协作精神，以及我们围绕它构建的技术。",
    ],
    prep: "准备期",
    ramp: "收益创造",
    axisX: "月",
    axisY: "每位伙伴收益（美元）",
    note: "图中数字为每位合作伙伴的数值。",
    stats: [
      { value: "2 个月", label: "准备期" },
      { value: "$4K+", label: "第 3 个月" },
      { value: "$13K+", label: "第 10 个月" },
    ],
  },
  why: {
    kicker: "02 · 为何选择",
    title: "为何与 ATS Group 合作？",
    sub: "不是交代完就被遗忘的供应商，而是像你一样思考业务的技术伙伴。",
    blocks: [
      {
        q: "ATS Group 有何不同？",
        a: "我们从你的业务出发，而非从一堆工具出发。再以资深工程与真实的 AI 经验，构建能与你共同扩展的成果。",
        points: ["业务优先的思考", "长期合作关系", "AI 与自动化专长", "现代技术栈", "透明的沟通", "可扩展与未来成长"],
      },
      {
        q: "企业为何能信任我们？",
        a: "信任来自交付的方式：可预期、质量看得见、上线后依然在的支持。",
        points: ["对质量的承诺", "可靠的交付流程", "聚焦可衡量的成果", "技术上的卓越", "长期支持"],
      },
      {
        q: "我们在寻找怎样的合作？",
        a: "我们与以年为单位思考的人合作得最好。如果你看重真实关系胜过一次交易，我们应该聊聊。",
        points: ["商业协作", "战略合作", "技术合作", "与初创公司协作", "企业级项目", "长期客户关系"],
      },
      {
        q: "我们如何展开合作？",
        a: "先倾听，就「成功的样子」达成一致，并全程让你了解进展。责任是双向的。",
        points: ["先理解业务目标", "透明的沟通", "共享愿景与责任", "持续改进", "共同成长与成功"],
      },
      {
        q: "什么价值观指引我们？",
        a: "无论是否有人在看，同样的原则指引着每一个决定。",
        points: ["信任", "正直", "创新", "担当", "长期思维", "持续学习"],
      },
    ],
  },
  approach: {
    kicker: "03 · 我们的方式",
    title: "重匠心，轻喧嚣。",
    sub_a: "我们相信", sub_em: "稳健而有意识的持续改进", sub_b: "，并将其贯彻于软件的打造过程。小步快走，频繁交付。凡是自己不愿运维的，绝不交付。",
    steps: [
      { no: "I", title: "先倾听", body: "我们从你的约束与客户出发，而非我们偏爱的框架。合适的工具，是你的团队能长久驾驭的那一个。" },
      { no: "II", title: "公开地构建", body: "短周期、可见的进展、尽早可用的软件。决策即时共享，绝不是黑箱。" },
      { no: "III", title: "让它更好", body: "我们交付有文档、经测试的系统，以及运维它们的知识。我们的目标，是让自己变得可有可无。" },
    ],
  },
  stack: {
    kicker: "04 · 技术栈",
    title: "我们所选的工具。",
    sub: "务实、经过验证、按项目选型，绝不盲目跟风。",
    columns: [
      { title: "前端", items: ["React", "Next.js", "TypeScript", "Vue", "Tailwind"] },
      { title: "后端", items: ["Node.js", "Go", "Python", "PostgreSQL", "GraphQL"] },
      { title: "AI / 自动化", items: ["Claude & OpenAI", "LangChain", "n8n / Zapier", "向量数据库", "RAG"] },
      { title: "云与运维", items: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"] },
    ],
  },
  collab: {
    kicker: "05 · 合作伙伴",
    title: "共同打造，长久同行。",
    lead: "我们由衷期待发挥所长，帮助你把愿景变为现实。",
    paras: [
      "我们引以为傲的每一个成果，都源自同一处起点：彼此信任、目标一致的人。项目总会有艰难的时刻，真正支撑它走下去的，是持续的沟通、专业的态度，以及对彼此成功的真诚投入。",
      "对我们而言，合作不止于并肩工作。它意味着优势互补、坦诚交流，并打开任何一方独自无法触及的大门。美好的成果，源自持续的努力与支持身边人的真诚意愿。",
      "我们最看重的合作，并非追求短期的得失。它建立在可靠、相互尊重与共同的长期目标之上，随时间不断成长。当伙伴与我们的团队朝同一愿景前行，成果往往比项目本身更为长久。",
      "目前，我们正寻求与重视真诚、成长导向合作的专业人士、创始人与商业伙伴建立联系，尤其是在美国与加拿大。无论你着眼于业务拓展、新技术，还是创造新机会，我们都期待与你一同探索可以共建的未来。",
    ],
    noTech: "而且，与我们合作并不需要懂技术。工程与 AI 的专长由我们带来；我们所期待的，是开放、信任，以及真正的合作精神。这，才是让合作得以成立的根本。",
    revenue: "你也无需技术背景，便能与我们一同获得收益。通过推荐与收益分成的合作，你的人脉、市场认知与关系都能转化为实际收入，而所有技术交付都由我们在幕后默默完成。",
    meetingNote: "换句话说，即使没有相关领域的专业知识，通过合作也能带来实在的成果与真实的收益。具体如何运作，我们会在一次简短的会议中为你详细说明。",
    closing: "携手同行，让想法变为机会，也让机会化为长久的价值。",
    cta: "开始一次对话",
    slides: [
      { alt: "两位开发者在笔记本前一起审阅代码", caption: "共同的目标，坦诚的沟通" },
      { alt: "围坐在同一张桌前协作的团队", caption: "随时间成长的合作" },
      { alt: "会议中击掌庆祝的合作伙伴", caption: "信任为先，水到渠成" },
      { alt: "在白板前一起规划的团队", caption: "打造长久的价值" },
    ],
  },
  philosophy: {
    kicker: "我们的理念",
    quote: "伟大的成就，极少由一人独自完成。最强的成果，来自彼此信任的合作，让想法、专长与投入朝着共同的愿景一起努力。",
    paras: [
      "有意义的成功需要耐心。真正重要的工作，很少能在一次冲刺中完成；它由那些为彼此持续付出的人，一点一滴稳健地建成。",
      "强大的合作，是在艰难处而非顺境中受到考验。当出现问题或计划生变，真正的伙伴会留在场内，与你一起解决。",
      "信任是其他一切赖以承载的基石。一旦建立，决策更快、反馈更坦诚、成果也明显更好。",
      "创新极少来自孤立的一个头脑。当知识与经验被开放地分享，人们敢于尝试、质疑与打磨，创新便会生长。",
      "长期思维会复利累积。为未来数年、而非下一个季度所做的选择，往往在日后创造更大的机会。",
      "最好的成果来自朝同一方向划桨。当目标共享、方向清晰，优秀的团队总能找到抵达的路。",
    ],
  },
  founders: {
    kicker: "06 · 创始人",
    title: "ATS 背后的人。",
    sub: "两位创始人，同一标准：做诚实的工作，建立真实的关系，让每个项目都比当初更好。",
    people: [
      {
        initials: "HT",
        name: "Daniel (Hiro Tanaka)",
        role: "联合创始人 & CTO",
        bio: "Daniel 负责 ATS Group 的工程与应用 AI。他的职业生涯始终处于扎实软件与务实 AI 的交汇处：设计系统、培养工程师、坚守诚实的交付。他相信好的技术是安静的：它能用、耐久，并且不碍事。",
        experience: [
          "10 年以上生产级软件的构建与扩展",
          "金融科技、SaaS 与电商的全栈 / AI 开发",
          "主导架构、代码质量与 AI 自动化",
        ],
      },
      {
        initials: "AI",
        name: "Akira Iwata",
        role: "联合创始人 & CEO",
        bio: "Akira 连接工程与业务，专注于合作伙伴与客户关系，确保每个项目都能落地为真实成果。Akira 的信念很简单：技术只有在帮助人与企业前进时才有意义。",
        experience: [
          "拥有商业战略与运营背景",
          "建立长期的客户与伙伴关系",
          "推动跨市场的增长、交付与合作",
        ],
      },
    ],
  },
  faqHead: {
    kicker: "07 · 常见问题",
    title: "我们直接作答。",
    sub: "这些是合作伙伴与客户在开始前常问的问题。如果没有你的那一条，欢迎直接问我们。",
  },
  contact: {
    kicker: "08 · 联系我们",
    title: "一起打造长久的价值。",
    sub: "告诉我们你正在做的事，或预约一次 30 分钟的通话。无需幻灯片，只需一次坦诚的交流。",
    formTitle: "给我们留言",
    formSub: "每一条咨询，我们都会在一个工作日内回复。",
    name: "姓名 *", namePh: "你的姓名",
    email: "邮箱 *", emailPh: "you@company.com",
    company: "公司", companyPh: "公司（选填）",
    help: "我们能帮你什么？", helpPh: "选择一个主题…",
    services: ["全栈开发", "AI 自动化", "CMS 内容管理", "CRM 客户管理", "合作伙伴 / 协作", "其他"],
    message: "留言 *", messagePh: "用几句话介绍你的项目、时间安排或目标…",
    submit: "发送留言", submitting: "发送中…",
    successTitle: "谢谢，已收到你的留言。",
    successBody: "我们会尽快与你联系。如有急事，欢迎在右侧预约通话。",
    sendAnother: "再发一条",
    errorGeneric: "出了点问题。",
    fineprint: "提交即表示你同意我们就此咨询与你联系。我们绝不会分享你的信息。",
    points: [
      { label: "所在地", value: "日本 · 东京" },
      { label: "回复", value: "一个工作日内" },
      { label: "语言", value: "English / 日本語 / 中文" },
    ],
    bookingTitle: "想直接聊聊？预约通话",
    bookingSub: "直接从我们的日历中预约 30 分钟的时段。",
    fallback: "日历无法显示？ ",
    fallbackLink: "在新标签页打开 Calendly →",
  },
  footer: {
    blurb: "软件工程、AI 自动化与合作，源自东京。",
    location: "日本 · 东京",
    schedule: "预约会议 →",
    rights: "版权所有。",
    tagline: "可靠的工程，来自东京。",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, ja, zh };
