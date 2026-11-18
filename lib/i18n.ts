/**
 * Lightweight i18n dictionary.
 * English is the default; Japanese and Chinese are secondary languages.
 * Strings are consumed via the useT() hook (see components/LanguageProvider).
 * FAQ content lives separately in lib/faq.ts.
 *
 * Image paths are locale-independent and live in lib/site.ts — only the
 * alt text is translated here.
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
  nav: { offer: string; how: string; terms: string; about: string; faq: string; apply: string };
  hero: {
    eyebrow: string;
    l1: string; l2: string;
    lede: string;
    cta: string; secondary: string;
    imgAlt: string;
    stats: { dt: string; dd: string }[];
  };
  deal: {
    kicker: string; title: string; sub: string;
    items: { role: string; title: string; body: string; alt: string }[];
  };
  who: {
    kicker: string; title: string; sub: string; imgAlt: string;
    forTitle: string; forItems: string[];
    notTitle: string; notItems: string[];
  };
  how: {
    kicker: string; title: string; sub: string;
    steps: { no: string; title: string; body: string }[];
  };
  terms: {
    kicker: string; title: string; sub: string; imgAlt: string;
    rows: { title: string; body: string }[];
    note: string;
  };
  about: {
    kicker: string; title: string; imgAlt: string;
    paras: string[];
    triad: { letter: string; word: string; body: string }[];
    buildTitle: string; builds: string[];
  };
  company: {
    kicker: string; title: string;
    rows: { label: string; value: string }[];
  };
  faqHead: { kicker: string; title: string; sub: string };
  contact: {
    kicker: string; title: string; sub: string;
    formTitle: string; formSub: string;
    name: string; namePh: string;
    email: string; emailPh: string;
    loc: string; locPh: string;
    network: string; networkPh: string; networks: string[];
    message: string; messagePh: string;
    submit: string; submitting: string;
    successTitle: string; successBody: string; sendAnother: string;
    errorGeneric: string; fineprint: string;
    points: { label: string; value: string }[];
    bookingTitle: string; bookingSub: string;
    fallback: string; fallbackLink: string;
  };
  footer: { blurb: string; location: string; schedule: string; rights: string; tagline: string };
};

const en: Dict = {
  nav: { offer: "The offer", how: "How it works", terms: "Terms", about: "About us", faq: "FAQ", apply: "Apply" },

  hero: {
    eyebrow: "ATS Group · Tokyo, Japan",
    l1: "Looking for an",
    l2: "American Partner",
    lede:
      "We are a software and AI studio in Tokyo. We have the engineering capacity and the work to sell — what we do not have is someone on the ground in the United States. If that is you, there is a straightforward arrangement to be made.",
    cta: "Apply as a partner",
    secondary: "See how it works",
    imgAlt:
      "A tiger and a bald eagle in business suits shaking hands in front of a US flag and a city skyline",
    stats: [
      { dt: "$0", dd: "to become a partner" },
      { dt: "Written", dd: "terms before anything starts" },
      { dt: "Tokyo", dd: "engineering team behind you" },
    ],
  },

  deal: {
    kicker: "The offer",
    title: "A clear split of who does what.",
    sub: "Three sentences describe the whole arrangement. Everything else on this page is detail.",
    items: [
      {
        role: "We bring",
        title: "The opportunities.",
        body:
          "Real engineering and AI work from our Tokyo studio: web platforms, automation, AI integration, CMS and CRM builds. We scope it, price it, build it and support it. You are never selling something that does not exist yet.",
        alt: "Close-up of the tiger in a suit with a gold paw-print lapel pin",
      },
      {
        role: "You bring",
        title: "The local connections.",
        body:
          "You know businesses in the US that need this work, and you can get a first conversation started. Introductions, meetings, and the credibility that only comes from being local. No technical background is required.",
        alt: "Close-up of the bald eagle in a suit with a US flag lapel pin",
      },
      {
        role: "Together",
        title: "We share the profit.",
        body:
          "When a deal closes, you take an agreed share of the profit on it. The percentage is written down before we begin and it does not change afterwards. No clawbacks, no moving targets.",
        alt: "A tiger paw and a human hand in a firm handshake",
      },
    ],
  },

  who: {
    kicker: "Who this is for",
    title: "The right partner, not the most partners.",
    sub: "We are looking for one or two people to work with properly, not a list of names. It is worth being honest about the fit in both directions.",
    imgAlt: "The tiger in a suit surrounded by a group of eagles in business attire",
    forTitle: "This fits if",
    forItems: [
      "You live and work in the United States and have a genuine professional network.",
      "You have sold services before — or you simply know a lot of the right people.",
      "You can take a first meeting and explain a straightforward offer in plain language.",
      "You are interested in something ongoing rather than a single introduction.",
      "You are comfortable having the terms in writing and signing them.",
    ],
    notTitle: "This is not for you if",
    notItems: [
      "You are looking for a salaried position — this is a partnership, paid from results.",
      "You need to be paid before anything has closed.",
      "You would rather keep the arrangement informal and undocumented.",
      "You are expecting guaranteed income. Nobody can honestly promise that.",
    ],
  },

  how: {
    kicker: "How it works",
    title: "Four steps. No surprises.",
    sub: "From the first message to the first payout, this is the entire process.",
    steps: [
      {
        no: "01",
        title: "Introduce yourself",
        body:
          "Send a short message: where you are, the kind of businesses you have access to, and what you have done before. If it looks like a fit, we book a 30-minute call. No pitch deck required.",
      },
      {
        no: "02",
        title: "Agree the terms in writing",
        body:
          "We put the profit split, who is responsible for what, and how either side can walk away into one short document. You read it, you change what you want changed, we both sign. Nothing starts before that.",
      },
      {
        no: "03",
        title: "Make the introductions",
        body:
          "You open the door and stay in the room. We handle scoping, pricing, delivery, and support. You are copied on anything that touches your contacts, so you always know what is being said in your name.",
      },
      {
        no: "04",
        title: "Share the profit",
        body:
          "The client pays, the work gets delivered, and your agreed share is paid on a fixed schedule. You see the figures the calculation was based on, not just the total.",
      },
    ],
  },

  terms: {
    kicker: "Transparency",
    title: "Simple agreement. Full transparency.",
    sub: "A partner offer that cannot answer these four questions is not worth taking. So here are our answers up front.",
    imgAlt:
      "The tiger and the eagle in suits, arm in arm, giving a thumbs up with the Statue of Liberty behind them",
    rows: [
      {
        title: "No upfront payment, ever",
        body:
          "You never pay us anything to become a partner. There is no joining fee, no starter kit, no training package, no software licence. If money has to move before you earn, it is moving the wrong way.",
      },
      {
        title: "Everything in writing first",
        body:
          "The split, the responsibilities, the payment schedule and the exit terms live in one short document that you get to read and amend before signing. No verbal agreements.",
      },
      {
        title: "Open numbers",
        body:
          "You see what the client was invoiced and what the profit on the deal actually was. Your share is calculated from figures you can check, not from a number we hand you.",
      },
      {
        title: "Leave whenever you want",
        body:
          "Either side can end the arrangement with notice. Anything already closed still pays out. You are not locked into anything, and neither are we.",
      },
    ],
    note:
      "We are a software company in Tokyo, not a recruitment scheme. We are not asking you to buy anything, recruit anyone, or move money on our behalf. If an offer like this ever asks you for those things, walk away from it.",
  },

  about: {
    kicker: "Who you would be partnering with",
    title: "ATS Group, Tokyo.",
    imgAlt: "The tiger in a three-piece suit at a desk with a glowing globe",
    paras: [
      "We are a small, senior engineering studio in Tokyo. We build production software and applied AI for businesses — the unglamorous kind of work that has to keep running on Monday morning, not demos.",
      "The work is good and the team is solid. Our limitation is reach: building trust with a business in the United States from an office in Tokyo is slow, and introductions from someone the client already knows are worth more than any amount of outbound email.",
      "That is the entire reason this page exists. We are not short of engineers. We are short of an American who can open the right doors.",
    ],
    triad: [
      { letter: "A", word: "Alliance", body: "We work as a partner, not a vendor. Shared goals, shared risk, shared upside." },
      { letter: "T", word: "Technology", body: "Full-stack engineering and applied AI that solves a real business problem." },
      { letter: "S", word: "Success", body: "Measured in what the client earns and keeps — which is what you are paid from." },
    ],
    buildTitle: "What we actually build",
    builds: [
      "Full-stack web platforms and APIs",
      "AI automation, LLM agents and RAG systems",
      "CMS builds for marketing teams",
      "CRM and internal business tooling",
      "Cloud infrastructure and DevOps",
      "Ongoing maintenance and support",
    ],
  },

  company: {
    kicker: "Company",
    title: "Company profile",
    rows: [
      { label: "Company name", value: "ATS Group" },
      { label: "Established", value: "2024" },
      { label: "Location", value: "Tokyo, Japan" },
      { label: "Representatives", value: "Daniel (Hiro Tanaka), Akira Iwata" },
      { label: "Business", value: "Full-stack development, AI automation, CMS & CRM solutions" },
      { label: "Working languages", value: "English / 日本語 / 中文" },
    ],
  },

  faqHead: {
    kicker: "Questions",
    title: "The things you are right to ask.",
    sub: "Including the sceptical ones. If something is missing here, ask it directly.",
  },

  contact: {
    kicker: "Apply",
    title: "Interested? Let's talk.",
    sub: "Tell us a little about yourself and your network. Every message is read by one of the two founders, and you will get an answer either way.",
    formTitle: "Apply as a partner",
    formSub: "Four fields. It does not need to be formal.",
    name: "Your name",
    namePh: "Jane Miller",
    email: "Email",
    emailPh: "jane@example.com",
    loc: "Where you are based",
    locPh: "Austin, TX",
    network: "Who is in your network?",
    networkPh: "Select the closest match",
    networks: [
      "Startups & tech companies",
      "Small & mid-size businesses",
      "Enterprise / corporate",
      "Agencies & consultancies",
      "Mixed / other",
    ],
    message: "Tell us about your network",
    messagePh:
      "The kind of businesses you have access to, anything you have sold before, and what you would want out of the arrangement.",
    submit: "Send application",
    submitting: "Sending…",
    successTitle: "Thank you — this is with us.",
    successBody:
      "We have your application and a confirmation is on its way to your inbox. One of the founders will reply within one business day.",
    sendAnother: "Send another message",
    errorGeneric: "We couldn't send your message right now. Please try again, or book a call.",
    fineprint:
      "We use your details only to reply to you. No lists, no sharing with anyone else, no automated follow-up sequences.",
    points: [
      { label: "Reply time", value: "Within one business day" },
      { label: "Who reads it", value: "A founder, not an assistant" },
      { label: "Cost to apply", value: "Nothing, now or later" },
    ],
    bookingTitle: "Or book a call directly",
    bookingSub: "Thirty minutes, no preparation needed. Bring your questions.",
    fallback: "Widget not loading? ",
    fallbackLink: "Open Calendly in a new tab →",
  },

  footer: {
    blurb:
      "A Tokyo software and AI studio looking for one US-based partner. We bring the work, you bring the connections, the profit is split on written terms.",
    location: "Tokyo, Japan · Working with partners worldwide",
    schedule: "Book a 30-minute call →",
    rights: "All rights reserved.",
    tagline: "Alliance · Technology · Success",
  },
};

const ja: Dict = {
  nav: { offer: "ご提案", how: "進め方", terms: "条件", about: "会社概要", faq: "よくある質問", apply: "応募する" },

  hero: {
    eyebrow: "ATS Group · 東京",
    l1: "アメリカの",
    l2: "パートナーを探しています",
    lede:
      "私たちは東京のソフトウェア・AI スタジオです。開発力も、提供できる案件もあります。足りないのは、アメリカ現地で動ける人です。心当たりがあれば、話は単純です。",
    cta: "パートナーに応募する",
    secondary: "進め方を見る",
    imgAlt: "星条旗と街並みを背景に、スーツ姿のトラとハクトウワシが握手している",
    stats: [
      { dt: "0円", dd: "パートナー参加に費用は不要" },
      { dt: "書面", dd: "着手前に条件を明文化" },
      { dt: "東京", dd: "開発チームが背後に控える" },
    ],
  },

  deal: {
    kicker: "ご提案",
    title: "役割分担は、はっきりしています。",
    sub: "この取り決めは三行で説明できます。このページの残りは、すべてその詳細です。",
    items: [
      {
        role: "私たちが用意するもの",
        title: "案件。",
        body:
          "東京のスタジオが手がける実際の開発・AI 案件です。Web プラットフォーム、業務自動化、AI 連携、CMS・CRM 構築。要件定義から見積り、開発、保守まで私たちが担当します。存在しないものを売っていただくことはありません。",
        alt: "金の肉球ピンバッジを着けたスーツ姿のトラのクローズアップ",
      },
      {
        role: "あなたが持ち込むもの",
        title: "現地のつながり。",
        body:
          "この種の仕事を必要とする米国企業をご存じで、最初の会話を始められる方。紹介、面談、そして現地にいる人だけが持つ信用です。技術的な知識は必要ありません。",
        alt: "星条旗のピンバッジを着けたスーツ姿のハクトウワシのクローズアップ",
      },
      {
        role: "ふたりで",
        title: "利益を分け合う。",
        body:
          "成約した案件の利益から、合意した割合をお渡しします。その割合は着手前に書面化し、後から変更することはありません。遡っての減額も、条件の後出しもありません。",
        alt: "トラの前足と人の手がしっかりと握手している様子",
      },
    ],
  },

  who: {
    kicker: "こんな方へ",
    title: "数より、ひとりの適任者を。",
    sub: "名簿を作りたいのではなく、一人か二人の方ときちんと組みたいと考えています。相性については、お互い率直であるべきです。",
    imgAlt: "ビジネススーツのワシたちに囲まれた、スーツ姿のトラ",
    forTitle: "こんな方に向いています",
    forItems: [
      "米国在住で、実際に機能する人脈をお持ちの方。",
      "サービスを販売した経験がある、あるいは単純に適切な人を多くご存じの方。",
      "最初の面談を設定し、提案を平易な言葉で説明できる方。",
      "一度きりの紹介ではなく、継続的な関係に関心がある方。",
      "条件を書面にし、署名することに抵抗がない方。",
    ],
    notTitle: "こんな方には向きません",
    notItems: [
      "固定給の職をお探しの方 — これは成果から支払われるパートナーシップです。",
      "成約前の支払いが必要な方。",
      "取り決めを口約束のままにしておきたい方。",
      "収入の保証を期待される方。それを正直に約束できる人はいません。",
    ],
  },

  how: {
    kicker: "進め方",
    title: "4 ステップ。想定外はありません。",
    sub: "最初のご連絡から初回のお支払いまで、全体の流れです。",
    steps: [
      {
        no: "01",
        title: "自己紹介をお送りください",
        body:
          "短い文章で構いません。拠点、接点のある企業の種類、これまでのご経験。相性が良さそうであれば 30 分のオンライン面談を設定します。資料は不要です。",
      },
      {
        no: "02",
        title: "条件を書面で合意する",
        body:
          "利益の配分、担当範囲、双方の解約方法を 1 通の短い書面にまとめます。お読みいただき、変更したい点を反映し、双方で署名します。それ以前に作業は始めません。",
      },
      {
        no: "03",
        title: "ご紹介いただく",
        body:
          "あなたが扉を開け、その場に残ります。要件定義、見積り、開発、保守は私たちが担当します。あなたの紹介先に関わるやり取りはすべて共有するので、ご自身の名前で何が語られているかを常に把握できます。",
      },
      {
        no: "04",
        title: "利益を分け合う",
        body:
          "クライアントからの入金と納品を経て、合意した取り分を決まったスケジュールでお支払いします。合計額だけでなく、計算の根拠となった数字もご覧いただけます。",
      },
    ],
  },

  terms: {
    kicker: "透明性",
    title: "簡潔な契約。完全な透明性。",
    sub: "この 4 つの問いに答えられないパートナー募集は、受けるに値しません。ですので、先にこちらから答えます。",
    imgAlt: "自由の女神像を背景に、肩を組んで親指を立てるスーツ姿のトラとワシ",
    rows: [
      {
        title: "前払いは一切ありません",
        body:
          "パートナーになるために私たちへお支払いいただくものは何もありません。参加費、スターターキット、研修パッケージ、ソフトウェアのライセンス料、いずれも存在しません。報酬より先にお金が動くなら、それは逆方向です。",
      },
      {
        title: "まず書面で",
        body:
          "配分、担当範囲、支払スケジュール、解約条件は 1 通の短い書面にまとめ、署名前にお読みいただき修正できます。口約束はしません。",
      },
      {
        title: "数字を開示します",
        body:
          "クライアントへの請求額と、その案件で実際に出た利益をご覧いただけます。あなたの取り分は、こちらが提示する数字ではなく、確認できる数字から計算されます。",
      },
      {
        title: "いつでも終了できます",
        body:
          "どちらからでも、事前通知のうえ終了できます。すでに成約した分は約束どおりお支払いします。あなたも私たちも、何かに縛られることはありません。",
      },
    ],
    note:
      "私たちは東京のソフトウェア会社であり、勧誘のしくみではありません。何かを購入すること、誰かを勧誘すること、私たちに代わって資金を動かすことは一切求めません。こうした募集でそれらを求められたら、その話からは離れてください。",
  },

  about: {
    kicker: "組む相手について",
    title: "ATS Group（東京）",
    imgAlt: "光る地球儀を置いたデスクに座る、スリーピーススーツ姿のトラ",
    paras: [
      "東京にある、少数精鋭のエンジニアリングスタジオです。企業向けの実運用ソフトウェアと応用 AI を開発しています。デモではなく、月曜の朝も動き続けなければならない、地味な種類の仕事です。",
      "仕事の質もチームも確かです。足りないのは到達力です。東京のオフィスから米国企業との信頼関係を築くには時間がかかり、クライアントがすでに知っている人からの紹介は、どれだけの営業メールよりも価値があります。",
      "このページが存在する理由はそれだけです。エンジニアは足りています。足りていないのは、適切な扉を開けられるアメリカの方です。",
    ],
    triad: [
      { letter: "A", word: "Alliance（提携）", body: "業者ではなくパートナーとして。目標もリスクも成果も分かち合います。" },
      { letter: "T", word: "Technology（技術）", body: "実際の事業課題を解くフルスタック開発と応用 AI。" },
      { letter: "S", word: "Success（成功）", body: "クライアントが得て、手元に残した額で測ります。あなたの報酬の原資です。" },
    ],
    buildTitle: "実際に手がけているもの",
    builds: [
      "フルスタック Web プラットフォームと API",
      "AI 自動化、LLM エージェント、RAG システム",
      "マーケティングチーム向け CMS 構築",
      "CRM と社内業務ツール",
      "クラウドインフラと DevOps",
      "継続的な保守・運用サポート",
    ],
  },

  company: {
    kicker: "会社概要",
    title: "会社概要",
    rows: [
      { label: "会社名", value: "ATS Group" },
      { label: "設立", value: "2024年" },
      { label: "所在地", value: "日本・東京" },
      { label: "代表者", value: "Daniel（田中 大） / 岩田 明" },
      { label: "事業内容", value: "フルスタック開発、AI 自動化、CMS・CRM ソリューション" },
      { label: "対応言語", value: "English / 日本語 / 中文" },
    ],
  },

  faqHead: {
    kicker: "ご質問",
    title: "当然、聞いておきたいこと。",
    sub: "疑わしく思われる点も含めて。ここにない疑問は、直接お尋ねください。",
  },

  contact: {
    kicker: "応募",
    title: "ご興味があれば、お話ししましょう。",
    sub: "ご自身と人脈について少しお聞かせください。すべてのメッセージは創業者 2 名のいずれかが読み、可否にかかわらずお返事します。",
    formTitle: "パートナーに応募する",
    formSub: "4 項目だけです。かしこまった文章でなくて構いません。",
    name: "お名前",
    namePh: "山田 太郎",
    email: "メールアドレス",
    emailPh: "taro@example.com",
    loc: "拠点",
    locPh: "テキサス州オースティン",
    network: "どのような人脈をお持ちですか",
    networkPh: "最も近いものをお選びください",
    networks: [
      "スタートアップ・テック企業",
      "中小企業",
      "大企業・法人",
      "代理店・コンサルティング会社",
      "混在・その他",
    ],
    message: "人脈についてお聞かせください",
    messagePh: "接点のある企業の種類、販売のご経験、この取り決めに期待されることなど。",
    submit: "応募を送信",
    submitting: "送信中…",
    successTitle: "ありがとうございます。受け取りました。",
    successBody:
      "応募を受け付けました。確認メールをお送りしています。1 営業日以内に創業者のいずれかよりご返信します。",
    sendAnother: "別のメッセージを送る",
    errorGeneric: "ただいま送信できませんでした。再度お試しいただくか、面談をご予約ください。",
    fineprint:
      "いただいた情報はご返信のためだけに使用します。リスト化、第三者への提供、自動配信は一切行いません。",
    points: [
      { label: "返信まで", value: "1 営業日以内" },
      { label: "読むのは", value: "担当者ではなく創業者本人" },
      { label: "応募費用", value: "今も今後も無料" },
    ],
    bookingTitle: "直接ご予約もできます",
    bookingSub: "30 分、準備は不要です。ご質問をお持ちください。",
    fallback: "表示されない場合は ",
    fallbackLink: "Calendly を新しいタブで開く →",
  },

  footer: {
    blurb:
      "米国のパートナーを 1 名探している、東京のソフトウェア・AI スタジオです。案件は私たちが、つながりはあなたが。利益は書面の条件に従って分け合います。",
    location: "東京 · 世界中のパートナーと",
    schedule: "30 分の面談を予約する →",
    rights: "All rights reserved.",
    tagline: "Alliance · Technology · Success",
  },
};

const zh: Dict = {
  nav: { offer: "合作提案", how: "合作流程", terms: "条款", about: "关于我们", faq: "常见问题", apply: "申请" },

  hero: {
    eyebrow: "ATS Group · 日本东京",
    l1: "寻找一位",
    l2: "美国合作伙伴",
    lede:
      "我们是一家位于东京的软件与 AI 工作室。我们有开发能力，也有可以承接的项目，唯独缺少一位在美国本地的伙伴。如果这说的是您，事情其实很简单。",
    cta: "申请成为合作伙伴",
    secondary: "了解合作流程",
    imgAlt: "身着西装的老虎与白头鹰在美国国旗和城市天际线前握手",
    stats: [
      { dt: "0 元", dd: "成为合作伙伴无需任何费用" },
      { dt: "书面", dd: "开始前先写清条款" },
      { dt: "东京", dd: "工程团队作为后盾" },
    ],
  },

  deal: {
    kicker: "合作提案",
    title: "分工非常清楚。",
    sub: "整个合作用三句话就能说完，本页其余内容都只是细节。",
    items: [
      {
        role: "我们提供",
        title: "项目机会。",
        body:
          "来自东京工作室的真实开发与 AI 项目：Web 平台、流程自动化、AI 集成、CMS 与 CRM 建设。需求梳理、报价、开发与维护都由我们负责。您绝不需要去推销尚不存在的东西。",
        alt: "佩戴金色爪印徽章、身着西装的老虎特写",
      },
      {
        role: "您提供",
        title: "本地人脉。",
        body:
          "您认识需要这类服务的美国企业，并且能促成第一次对话。介绍、会面，以及只有身在本地才具备的信任感。不需要任何技术背景。",
        alt: "佩戴美国国旗徽章、身着西装的白头鹰特写",
      },
      {
        role: "我们共同",
        title: "分享利润。",
        body:
          "项目成交后，您将按约定比例分得利润。该比例在开始前以书面确定，之后不会更改。不会事后追扣，也不会临时调整标准。",
        alt: "虎爪与人手紧紧相握",
      },
    ],
  },

  who: {
    kicker: "适合谁",
    title: "我们要的是合适的人，不是最多的人。",
    sub: "我们希望认真地与一两位伙伴合作，而不是攒一份名单。合适与否，双方都该坦诚。",
    imgAlt: "身着西装的老虎被一群商务装扮的鹰围绕",
    forTitle: "以下情况比较合适",
    forItems: [
      "您在美国生活和工作，并拥有真实有效的职业人脉。",
      "您有销售服务的经验，或者单纯认识很多对的人。",
      "您能安排第一次会面，并用平实的语言讲清楚这个提案。",
      "您想要的是持续的合作关系，而不是一次性的介绍。",
      "您愿意把条款写下来并签字。",
    ],
    notTitle: "以下情况并不适合",
    notItems: [
      "您在找一份有固定薪水的工作 —— 这是按成果付酬的合作关系。",
      "您需要在任何项目成交之前就拿到报酬。",
      "您更希望双方只是口头约定、不留文件。",
      "您期待收入保证。没有人能诚实地给出这种承诺。",
    ],
  },

  how: {
    kicker: "合作流程",
    title: "四个步骤，没有意外。",
    sub: "从第一条消息到第一笔分成，这就是全部流程。",
    steps: [
      {
        no: "01",
        title: "先做个自我介绍",
        body:
          "一段简短的说明即可：您所在的地区、能接触到的企业类型、以及过往经历。如果看起来合适，我们会安排 30 分钟的线上沟通。不需要准备材料。",
      },
      {
        no: "02",
        title: "以书面形式确定条款",
        body:
          "我们会把利润分成、各自的职责、以及任一方如何退出写进一份简短的文件。您阅读、提出修改，双方签署。在此之前不会开始任何工作。",
      },
      {
        no: "03",
        title: "进行引荐",
        body:
          "您打开大门并留在沟通之中。需求梳理、报价、交付与维护由我们负责。凡是涉及您人脉的往来都会同步给您，您始终清楚以您的名义说了什么。",
      },
      {
        no: "04",
        title: "分享利润",
        body:
          "客户付款、项目交付之后，按固定周期支付您约定的分成。您看到的不只是总额，还有计算所依据的数字。",
      },
    ],
  },

  terms: {
    kicker: "透明度",
    title: "简单的协议，完全的透明。",
    sub: "一个回答不了这四个问题的合作邀约，不值得接受。所以我们先把答案放在这里。",
    imgAlt: "身着西装的老虎与鹰搭肩竖起大拇指，背景是自由女神像",
    rows: [
      {
        title: "永远没有预付费用",
        body:
          "成为合作伙伴，您无需向我们支付任何费用。没有加盟费、没有启动礼包、没有培训套餐、没有软件授权费。如果在您赚到钱之前就要先付钱，那方向就反了。",
      },
      {
        title: "一切先落到纸面",
        body:
          "分成比例、职责范围、付款周期与退出条款都写在一份简短的文件里，签署前您可以阅读并修改。不做口头约定。",
      },
      {
        title: "数字公开",
        body:
          "您可以看到客户被开具的金额，以及该项目实际产生的利润。您的分成依据的是可核对的数字，而不是我们单方面给出的数额。",
      },
      {
        title: "随时可以退出",
        body:
          "任何一方都可以提前通知后结束合作。已经成交的部分照常支付。您不会被绑住，我们也一样。",
      },
    ],
    note:
      "我们是一家位于东京的软件公司，不是招募式的生意。我们不会要求您购买任何东西、发展任何下线，或代我们转移资金。如果有类似的邀约向您提出这些要求，请立即远离。",
  },

  about: {
    kicker: "您将与谁合作",
    title: "ATS Group，东京。",
    imgAlt: "身着三件套西装的老虎坐在办公桌前，桌上有发光的地球仪",
    paras: [
      "我们是东京一家精干的工程工作室，为企业开发生产级软件与应用型 AI —— 是那种必须在周一早晨继续运转的、不起眼的工作，而不是演示。",
      "工作质量和团队都没有问题，我们欠缺的是触达能力。从东京的办公室与美国企业建立信任非常缓慢，而来自客户已经认识的人的引荐，胜过任何数量的陌生开发邮件。",
      "这就是这个页面存在的全部原因。我们不缺工程师，缺的是一位能敲开正确大门的美国伙伴。",
    ],
    triad: [
      { letter: "A", word: "Alliance（联盟）", body: "以伙伴而非供应商的身份合作。共享目标、共担风险、共享收益。" },
      { letter: "T", word: "Technology（技术）", body: "解决真实业务问题的全栈工程与应用型 AI。" },
      { letter: "S", word: "Success（成功）", body: "以客户赚到并留下的收益衡量，那也是您分成的来源。" },
    ],
    buildTitle: "我们实际做的事",
    builds: [
      "全栈 Web 平台与 API",
      "AI 自动化、LLM 智能体与 RAG 系统",
      "面向市场团队的 CMS 建设",
      "CRM 与企业内部工具",
      "云基础设施与 DevOps",
      "持续的维护与技术支持",
    ],
  },

  company: {
    kicker: "公司概要",
    title: "公司概要",
    rows: [
      { label: "公司名称", value: "ATS Group" },
      { label: "成立时间", value: "2024 年" },
      { label: "所在地", value: "日本东京" },
      { label: "代表人", value: "Daniel（田中大）、岩田明" },
      { label: "业务范围", value: "全栈开发、AI 自动化、CMS 与 CRM 解决方案" },
      { label: "工作语言", value: "English / 日本語 / 中文" },
    ],
  },

  faqHead: {
    kicker: "提问",
    title: "这些问题，您本就该问。",
    sub: "包括那些带着怀疑的问题。如果这里没有提到，欢迎直接来问。",
  },

  contact: {
    kicker: "申请",
    title: "有兴趣？聊一聊吧。",
    sub: "请简单介绍一下您自己和您的人脉。每一条消息都由两位创始人之一亲自阅读，无论结果如何都会回复您。",
    formTitle: "申请成为合作伙伴",
    formSub: "只有四项，不需要写得很正式。",
    name: "您的姓名",
    namePh: "张伟",
    email: "电子邮箱",
    emailPh: "wei@example.com",
    loc: "所在城市",
    locPh: "德州奥斯汀",
    network: "您的人脉主要是",
    networkPh: "请选择最接近的一项",
    networks: [
      "初创与科技公司",
      "中小型企业",
      "大型企业 / 集团",
      "代理商与咨询公司",
      "混合 / 其他",
    ],
    message: "请介绍一下您的人脉",
    messagePh: "您能接触到的企业类型、过往的销售经验，以及您希望从这次合作中得到什么。",
    submit: "提交申请",
    submitting: "发送中…",
    successTitle: "谢谢，我们已经收到。",
    successBody: "申请已收到，确认邮件正在发往您的邮箱。创始人之一会在一个工作日内回复您。",
    sendAnother: "再发送一条消息",
    errorGeneric: "暂时无法发送，请稍后重试，或直接预约通话。",
    fineprint: "您的信息仅用于回复您本人。不会建立名单、不会提供给第三方、不会有自动跟进邮件。",
    points: [
      { label: "回复时间", value: "一个工作日内" },
      { label: "谁来阅读", value: "创始人本人，而非助理" },
      { label: "申请费用", value: "现在和以后都免费" },
    ],
    bookingTitle: "也可以直接预约通话",
    bookingSub: "30 分钟，无需准备，带着您的问题来即可。",
    fallback: "组件未加载？",
    fallbackLink: "在新标签页打开 Calendly →",
  },

  footer: {
    blurb:
      "一家位于东京的软件与 AI 工作室，正在寻找一位美国合作伙伴。项目由我们提供，人脉由您带来，利润按书面条款分享。",
    location: "日本东京 · 与世界各地的伙伴合作",
    schedule: "预约 30 分钟通话 →",
    rights: "All rights reserved.",
    tagline: "Alliance · Technology · Success",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, ja, zh };
