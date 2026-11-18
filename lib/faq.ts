import type { Locale } from "./i18n";

export type FaqItem = { q: string; a: string };

/**
 * Partner-programme FAQ. Deliberately includes the sceptical questions —
 * an offer like this is only credible if it answers them first.
 * Kept separate from i18n.ts to keep both files readable.
 */
export const faqItems: Record<Locale, FaqItem[]> = {
  en: [
    {
      q: "Is this a job?",
      a: "No. It is a partnership, and you are paid from the profit on work that closes. There is no salary, no fixed hours and no manager. If what you want is a salaried sales position, this is honestly not the right offer.",
    },
    {
      q: "Do I have to pay anything to join?",
      a: "No — not now, not later. There is no joining fee, no starter kit, no training package and no software to buy. Money only ever moves from us to you. If any opportunity like this asks you to pay first, that is the moment to walk away.",
    },
    {
      q: "What is the actual profit split?",
      a: "It depends on the size of the deal and how much of the relationship you carry — someone who makes an introduction and steps back is in a different position from someone who stays involved through delivery. We agree the number before anything starts and put it in writing. We would rather discuss it honestly on a call than print a figure here that we would have to renegotiate the moment we spoke.",
    },
    {
      q: "Do I need a technical background?",
      a: "No. You need to be able to explain, in plain language, that you know a team in Tokyo that builds software and AI systems, and to get us into the conversation. We handle every technical question from that point on, and we are happy to join the first call with you.",
    },
    {
      q: "What exactly would I be introducing?",
      a: "Full-stack web platforms, AI automation and LLM systems, CMS builds, CRM and internal tooling, and the cloud infrastructure underneath them. In practice most leads start as a business problem — a slow manual process, an ageing system, a product that needs building — rather than as a technology request.",
    },
    {
      q: "How do I know you can actually deliver?",
      a: "Before you introduce anyone, we will walk you through what we have built, how we work, and who does what. You are putting your own reputation on the line with your contacts, so it is reasonable to check us out properly first — and we would think less of a partner who did not.",
    },
    {
      q: "How do I know the profit numbers you show me are real?",
      a: "You see the client invoice and the costs the profit was calculated from, not just a final figure. If you ever want more detail on a deal you introduced, you can ask for it and you will get it. A partnership where one side cannot verify the arithmetic is not a partnership.",
    },
    {
      q: "What happens if the client does not pay?",
      a: "Then there is no profit on that deal, and nothing to share. We carry the delivery cost, you carry the time you spent. We are not going to pretend that risk does not exist — it is exactly why the terms are written down in advance.",
    },
    {
      q: "How much time does this take?",
      a: "That is up to you. Some partners make a handful of well-chosen introductions a year; others treat it as a serious part of their week. There is no quota and no activity reporting. What there also is not, is income without effort.",
    },
    {
      q: "Why not just hire a salesperson in the US?",
      a: "Because a salaried hire has to be paid before any revenue exists, and because what actually opens doors in the US is an existing relationship, not a job title. A partner who already has the network is worth considerably more to us than an employee who has to build one from scratch.",
    },
    {
      q: "Can I work with you while keeping my current job or business?",
      a: "Yes, and most partners will. This works well alongside consulting, an agency, or another role, as long as there is no conflict of interest with your employer. That is your call to make, and worth checking before we start.",
    },
    {
      q: "What happens to my contacts if we stop working together?",
      a: "Anything already closed still pays out on the agreed terms. Your contacts remain your contacts — we are not going to go around you to keep working with someone you introduced, and that commitment goes into the written agreement rather than staying a promise.",
    },
    {
      q: "Who would I actually be dealing with?",
      a: "One of the two founders, directly. There is no account manager layer and no sales team between you and the people doing the work. The same person who answers your first email is the one who signs the agreement.",
    },
    {
      q: "What is the first step?",
      a: "Send a short message through the form on this page, or book a 30-minute call. Tell us where you are, roughly who you know, and what you have done before. You will get a real answer either way, usually within one business day.",
    },
  ],

  ja: [
    {
      q: "これは雇用ですか？",
      a: "いいえ。パートナーシップであり、成約した案件の利益からお支払いします。固定給も、定時も、上司もありません。固定給の営業職をお探しであれば、正直なところこの募集は合いません。",
    },
    {
      q: "参加に費用はかかりますか？",
      a: "かかりません。今も、今後も。参加費、スターターキット、研修パッケージ、購入が必要なソフトウェア、いずれも存在しません。お金が動くのは常に私たちからあなたへの一方向だけです。この種の話で先に支払いを求められたら、そこで離れるべきです。",
    },
    {
      q: "利益の配分は実際どのくらいですか？",
      a: "案件の規模と、関係をどこまで担っていただくかによります。紹介だけして退かれる方と、納品まで関与される方とでは立場が異なります。着手前に数字を合意し、書面にします。ここに数字を載せて初回の通話で結局やり直すより、率直にお話ししたいと考えています。",
    },
    {
      q: "技術的な知識は必要ですか？",
      a: "不要です。東京にソフトウェアと AI を開発するチームを知っている、と平易な言葉で説明し、私たちを会話に引き合わせていただければ十分です。以降の技術的な質問はすべて私たちが対応します。最初の面談に同席することも可能です。",
    },
    {
      q: "具体的に何を紹介することになりますか？",
      a: "フルスタックの Web プラットフォーム、AI 自動化と LLM システム、CMS 構築、CRM と社内ツール、そしてそれらを支えるクラウド基盤です。実際には、技術の依頼というより「手作業が遅い」「システムが古い」「プロダクトを作りたい」といった事業上の課題から始まることがほとんどです。",
    },
    {
      q: "本当に納品できる会社だと、どう確認すればよいですか？",
      a: "どなたかをご紹介いただく前に、これまでの実績、進め方、担当分担をひととおりご説明します。あなたはご自身の信用を賭けて紹介されるわけですから、事前にしっかり確認されるのは当然です。確認しないパートナーのほうが、むしろ心配です。",
    },
    {
      q: "提示される利益の数字が本物だと、どう確認できますか？",
      a: "最終的な金額だけでなく、クライアントへの請求書と、利益算出の根拠となった費用をご覧いただけます。ご紹介いただいた案件について詳細を求められれば、いつでもお出しします。片方が計算を検証できない関係は、パートナーシップとは呼べません。",
    },
    {
      q: "クライアントが支払わなかった場合はどうなりますか？",
      a: "その案件に利益は出ず、分けるものもありません。私たちは開発費用を、あなたは費やした時間を負担することになります。このリスクが存在しないふりはしません。だからこそ、条件を事前に書面化しています。",
    },
    {
      q: "どのくらいの時間が必要ですか？",
      a: "あなた次第です。年に数件、厳選した紹介だけをされる方もいれば、週の活動として本格的に取り組む方もいます。ノルマも活動報告もありません。同時に、労力なしの収入もありません。",
    },
    {
      q: "なぜ米国で営業担当を雇わないのですか？",
      a: "給与は売上が立つ前から発生しますし、米国で実際に扉を開くのは肩書きではなく既存の人間関係だからです。すでに人脈をお持ちのパートナーは、ゼロから築く従業員よりはるかに価値があります。",
    },
    {
      q: "現在の仕事や事業を続けながら組めますか？",
      a: "はい、多くの方がそうされます。コンサルティング、代理店業、他の職務と並行して問題なく機能します。ただし現在の雇用主との利益相反がないことが前提です。そこはご自身で確認いただくべき点で、開始前に一度ご検討ください。",
    },
    {
      q: "提携を終了した場合、私の紹介先はどうなりますか？",
      a: "すでに成約した分は合意した条件どおりお支払いします。あなたの人脈はあなたのものです。ご紹介いただいた相手と、あなたを飛び越えて取引を続けることはありません。これは口約束ではなく、書面に明記します。",
    },
    {
      q: "実際の窓口は誰になりますか？",
      a: "創業者 2 名のいずれかが直接対応します。間にアカウントマネージャーや営業チームは入りません。最初のメールに返信する人間が、そのまま契約に署名します。",
    },
    {
      q: "まず何をすればよいですか？",
      a: "このページのフォームから短いメッセージをお送りいただくか、30 分の面談をご予約ください。拠点、おおよその人脈、これまでのご経験をお書きください。可否にかかわらず、通常 1 営業日以内にきちんとお返事します。",
    },
  ],

  zh: [
    {
      q: "这是一份工作吗？",
      a: "不是。这是合作关系，报酬来自成交项目的利润。没有固定工资、没有固定工时、也没有上级。如果您想要的是一份有底薪的销售职位，坦白说这个邀约并不合适。",
    },
    {
      q: "加入需要支付费用吗？",
      a: "不需要，现在不需要，以后也不需要。没有加盟费、没有启动礼包、没有培训套餐、没有必须购买的软件。资金永远只从我们流向您。如果任何类似的机会要求您先付钱，那就是该离开的时刻。",
    },
    {
      q: "利润具体怎么分？",
      a: "取决于项目规模，以及您在这段客户关系中承担多少——只做引荐随后退出，与全程参与到交付，是不同的位置。我们会在开始之前谈定这个数字并写进协议。与其在网页上印一个一通话就要重新谈的比例，我们更愿意在电话里坦诚地谈。",
    },
    {
      q: "我需要技术背景吗？",
      a: "不需要。您只要能用平实的语言说明：您认识一个在东京做软件和 AI 系统的团队，并把我们引入对话即可。从那之后的所有技术问题都由我们处理，我们也很乐意陪您一起参加第一次通话。",
    },
    {
      q: "我具体要引荐什么？",
      a: "全栈 Web 平台、AI 自动化与 LLM 系统、CMS 建设、CRM 与内部工具，以及支撑它们的云基础设施。实际上大多数线索最初都是一个业务难题——流程太慢、系统老旧、想做一个产品——而不是一个技术需求。",
    },
    {
      q: "我怎么确认你们真的交付得了？",
      a: "在您引荐任何人之前，我们会完整地向您介绍做过什么、如何工作、各自负责什么。您是拿自己的信誉去向熟人做担保，事先认真核实完全合理——不核实的合作伙伴反而更让我们担心。",
    },
    {
      q: "我怎么知道你们给我看的利润数字是真的？",
      a: "您看到的是客户发票和利润计算所依据的成本，而不只是一个最终数额。对于您引荐的项目，若需要更详细的说明，随时可以索取并会得到。一方无法核对账目的关系，称不上合作。",
    },
    {
      q: "如果客户不付款怎么办？",
      a: "那么这个项目就没有利润，也就没有可分的部分。我们承担开发成本，您承担投入的时间。我们不会假装这个风险不存在——这正是条款需要事先写清楚的原因。",
    },
    {
      q: "这需要花多少时间？",
      a: "由您决定。有些伙伴一年只做少数几次精心挑选的引荐，也有人把它当作每周工作的重要部分。没有业绩指标，也没有活动汇报。同样，也没有不费力气的收入。",
    },
    {
      q: "为什么不直接在美国雇一名销售？",
      a: "因为雇员在产生任何营收之前就需要发薪，而在美国真正能打开大门的是既有的人际关系，不是职位头衔。一位本就拥有人脉的伙伴，对我们的价值远高于一名需要从零建立人脉的员工。",
    },
    {
      q: "我能在保留现有工作或事业的同时合作吗？",
      a: "可以，大多数伙伴都是如此。这与咨询、代理公司或其他职务并行得很好，前提是与您现在的雇主不存在利益冲突。这需要您自己判断，建议在开始前先确认清楚。",
    },
    {
      q: "如果合作结束，我的人脉会怎样？",
      a: "已经成交的部分仍按约定条款支付。您的人脉仍然属于您——我们不会绕过您去继续和您引荐的客户做生意，而且这一点会写进协议，而不只是停留在口头承诺。",
    },
    {
      q: "我实际对接的是谁？",
      a: "两位创始人之一，直接对接。中间没有客户经理，也没有销售团队。回复您第一封邮件的人，就是最终签署协议的人。",
    },
    {
      q: "第一步该做什么？",
      a: "通过本页的表单发一条简短消息，或直接预约 30 分钟通话。告诉我们您在哪里、大致认识哪些人、以及过往做过什么。无论结果如何，通常会在一个工作日内得到真实的答复。",
    },
  ],
};
