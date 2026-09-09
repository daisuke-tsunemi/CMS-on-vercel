// Realistic mock data for the Executive CRM & Sales Pipeline Dashboard.
// No live database is connected; all data below is static sample data.

export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost"

export const STAGE_LABELS: Record<DealStage, string> = {
  lead: "リード",
  qualified: "有望",
  proposal: "提案",
  negotiation: "交渉",
  closed_won: "受注",
  closed_lost: "失注",
}

export type TeamMember = {
  id: string
  name: string
  initials: string
  role: string
  email: string
  quota: number
  closedWon: number
  dealsInProgress: number
  winRate: number
}

export const teamMembers: TeamMember[] = [
  { id: "u1", name: "田中 誠", initials: "田中", role: "シニアAE", email: "tanaka@example.co.jp", quota: 3000000, closedWon: 2820000, dealsInProgress: 8, winRate: 42 },
  { id: "u2", name: "佐藤 美咲", initials: "佐藤", role: "アカウントエグゼクティブ", email: "sato@example.co.jp", quota: 2500000, closedWon: 1980000, dealsInProgress: 6, winRate: 35 },
  { id: "u3", name: "鈴木 一郎", initials: "鈴木", role: "アカウントエグゼクティブ", email: "suzuki@example.co.jp", quota: 2500000, closedWon: 2150000, dealsInProgress: 7, winRate: 38 },
  { id: "u4", name: "高橋 陸", initials: "高橋", role: "SMB担当", email: "takahashi@example.co.jp", quota: 1800000, closedWon: 1120000, dealsInProgress: 5, winRate: 29 },
  { id: "u5", name: "伊藤 直樹", initials: "伊藤", role: "エンタープライズAE", email: "ito@example.co.jp", quota: 4000000, closedWon: 3560000, dealsInProgress: 4, winRate: 47 },
  { id: "u6", name: "渡辺 由紀", initials: "渡辺", role: "アカウントエグゼクティブ", email: "watanabe@example.co.jp", quota: 2200000, closedWon: 1340000, dealsInProgress: 6, winRate: 31 },
]

export type Company = {
  id: string
  name: string
  industry: string
  tier: "エンタープライズ" | "ミッドマーケット" | "SMB"
  employees: number
  website: string
  phone: string
  address: string
  owner: string
  arr: number
  healthScore: number
  createdAt: string
}

export const companies: Company[] = [
  { id: "c1", name: "大和物産株式会社", industry: "商社", tier: "エンタープライズ", employees: 4200, website: "yamato-bussan.co.jp", phone: "03-1234-5601", address: "東京都港区六本木1-1-1", owner: "伊藤 直樹", arr: 18500000, healthScore: 88, createdAt: "2022-04-12" },
  { id: "c2", name: "北陸精機工業", industry: "製造", tier: "ミッドマーケット", employees: 860, website: "hokuriku-seiki.co.jp", phone: "076-234-5602", address: "石川県金沢市本町2-2-2", owner: "田中 誠", arr: 6200000, healthScore: 74, createdAt: "2023-01-20" },
  { id: "c3", name: "サクラ・フィナンシャル", industry: "金融", tier: "エンタープライズ", employees: 3100, website: "sakura-financial.co.jp", phone: "03-1234-5603", address: "東京都千代田区大手町3-3-3", owner: "伊藤 直樹", arr: 22300000, healthScore: 91, createdAt: "2021-11-05" },
  { id: "c4", name: "みなと物流サービス", industry: "運輸・物流", tier: "ミッドマーケット", employees: 540, website: "minato-logistics.co.jp", phone: "045-345-5604", address: "神奈川県横浜市西区みなとみらい4-4-4", owner: "鈴木 一郎", arr: 4100000, healthScore: 63, createdAt: "2023-06-14" },
  { id: "c5", name: "アオゾラ・ヘルスケア", industry: "医療・ヘルスケア", tier: "ミッドマーケット", employees: 720, website: "aozora-health.co.jp", phone: "06-456-5605", address: "大阪府大阪市北区梅田5-5-5", owner: "佐藤 美咲", arr: 5300000, healthScore: 69, createdAt: "2022-09-30" },
  { id: "c6", name: "富士通商株式会社", industry: "商社", tier: "SMB", employees: 180, website: "fuji-tsusho.co.jp", phone: "03-1234-5606", address: "東京都新宿区西新宿6-6-6", owner: "高橋 陸", arr: 1200000, healthScore: 55, createdAt: "2024-02-18" },
  { id: "c7", name: "白河テクノロジーズ", industry: "IT・ソフトウェア", tier: "ミッドマーケット", employees: 430, website: "shirakawa-tech.co.jp", phone: "022-567-5607", address: "宮城県仙台市青葉区中央7-7-7", owner: "渡辺 由紀", arr: 3800000, healthScore: 71, createdAt: "2023-03-08" },
  { id: "c8", name: "瀬戸内マテリアル", industry: "製造", tier: "SMB", employees: 210, website: "setouchi-material.co.jp", phone: "082-678-5608", address: "広島県広島市中区紙屋町8-8-8", owner: "鈴木 一郎", arr: 980000, healthScore: 48, createdAt: "2024-05-22" },
  { id: "c9", name: "旭化学工業", industry: "化学", tier: "エンタープライズ", employees: 2600, website: "asahi-kagaku.co.jp", phone: "052-789-5609", address: "愛知県名古屋市中村区名駅9-9-9", owner: "伊藤 直樹", arr: 15400000, healthScore: 82, createdAt: "2021-07-19" },
  { id: "c10", name: "みらい建設パートナーズ", industry: "建設", tier: "ミッドマーケット", employees: 610, website: "mirai-kensetsu.co.jp", phone: "092-890-5610", address: "福岡県福岡市博多区博多駅前10-10-10", owner: "田中 誠", arr: 4700000, healthScore: 66, createdAt: "2022-12-01" },
  { id: "c11", name: "湘南ライフスタイル", industry: "小売", tier: "SMB", employees: 95, website: "shonan-lifestyle.co.jp", phone: "0466-901-5611", address: "神奈川県藤沢市鵠沼11-11-11", owner: "高橋 陸", arr: 620000, healthScore: 51, createdAt: "2024-08-09" },
  { id: "c12", name: "東海リアルエステート", industry: "不動産", tier: "ミッドマーケット", employees: 380, website: "tokai-realestate.co.jp", phone: "052-012-5612", address: "愛知県名古屋市東区東桜12-12-12", owner: "渡辺 由紀", arr: 3200000, healthScore: 60, createdAt: "2023-10-27" },
]

export type Deal = {
  id: string
  name: string
  companyId: string
  companyName: string
  value: number
  stage: DealStage
  probability: number
  ownerId: string
  ownerName: string
  ownerInitials: string
  closeDate: string
  lastActivityDate: string
  daysStalled: number
  createdAt: string
}

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}
function daysAhead(n: number) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export const deals: Deal[] = [
  { id: "d1", name: "基幹システム更新プロジェクト", companyId: "c1", companyName: "大和物産株式会社", value: 42000000, stage: "negotiation", probability: 70, ownerId: "u5", ownerName: "伊藤 直樹", ownerInitials: "伊藤", closeDate: daysAhead(18), lastActivityDate: daysAgo(2), daysStalled: 2, createdAt: "2025-05-02" },
  { id: "d2", name: "生産管理クラウド導入", companyId: "c2", companyName: "北陸精機工業", value: 9800000, stage: "proposal", probability: 45, ownerId: "u1", ownerName: "田中 誠", ownerInitials: "田中", closeDate: daysAhead(30), lastActivityDate: daysAgo(21), daysStalled: 21, createdAt: "2025-04-15" },
  { id: "d3", name: "リスク管理プラットフォーム拡張", companyId: "c3", companyName: "サクラ・フィナンシャル", value: 68000000, stage: "negotiation", probability: 80, ownerId: "u5", ownerName: "伊藤 直樹", ownerInitials: "伊藤", closeDate: daysAhead(10), lastActivityDate: daysAgo(1), daysStalled: 1, createdAt: "2025-03-20" },
  { id: "d4", name: "配送最適化ソリューション", companyId: "c4", companyName: "みなと物流サービス", value: 5400000, stage: "qualified", probability: 30, ownerId: "u3", ownerName: "鈴木 一郎", ownerInitials: "鈴木", closeDate: daysAhead(45), lastActivityDate: daysAgo(18), daysStalled: 18, createdAt: "2025-06-01" },
  { id: "d5", name: "電子カルテ連携基盤", companyId: "c5", companyName: "アオゾラ・ヘルスケア", value: 7600000, stage: "proposal", probability: 50, ownerId: "u2", ownerName: "佐藤 美咲", ownerInitials: "佐藤", closeDate: daysAhead(25), lastActivityDate: daysAgo(3), daysStalled: 3, createdAt: "2025-05-28" },
  { id: "d6", name: "経費精算システムリプレース", companyId: "c6", companyName: "富士通商株式会社", value: 2100000, stage: "lead", probability: 15, ownerId: "u4", ownerName: "高橋 陸", ownerInitials: "高橋", closeDate: daysAhead(60), lastActivityDate: daysAgo(9), daysStalled: 9, createdAt: "2025-06-10" },
  { id: "d7", name: "カスタマーサポートAI導入", companyId: "c7", companyName: "白河テクノロジーズ", value: 6300000, stage: "negotiation", probability: 65, ownerId: "u6", ownerName: "渡辺 由紀", ownerInitials: "渡辺", closeDate: daysAhead(14), lastActivityDate: daysAgo(4), daysStalled: 4, createdAt: "2025-04-30" },
  { id: "d8", name: "品質検査データ分析基盤", companyId: "c8", companyName: "瀬戸内マテリアル", value: 3200000, stage: "qualified", probability: 25, ownerId: "u3", ownerName: "鈴木 一郎", ownerInitials: "鈴木", closeDate: daysAhead(40), lastActivityDate: daysAgo(16), daysStalled: 16, createdAt: "2025-06-05" },
  { id: "d9", name: "全社セキュリティ基盤刷新", companyId: "c9", companyName: "旭化学工業", value: 51000000, stage: "proposal", probability: 55, ownerId: "u5", ownerName: "伊藤 直樹", ownerInitials: "伊藤", closeDate: daysAhead(35), lastActivityDate: daysAgo(5), daysStalled: 5, createdAt: "2025-05-10" },
  { id: "d10", name: "施工管理モバイルアプリ", companyId: "c10", companyName: "みらい建設パートナーズ", value: 4800000, stage: "lead", probability: 20, ownerId: "u1", ownerName: "田中 誠", ownerInitials: "田中", closeDate: daysAhead(55), lastActivityDate: daysAgo(24), daysStalled: 24, createdAt: "2025-06-18" },
  { id: "d11", name: "店舗POS統合", companyId: "c11", companyName: "湘南ライフスタイル", value: 1600000, stage: "qualified", probability: 30, ownerId: "u4", ownerName: "高橋 陸", ownerInitials: "高橋", closeDate: daysAhead(50), lastActivityDate: daysAgo(7), daysStalled: 7, createdAt: "2025-06-22" },
  { id: "d12", name: "賃貸管理システム更新", companyId: "c12", companyName: "東海リアルエステート", value: 3700000, stage: "proposal", probability: 40, ownerId: "u6", ownerName: "渡辺 由紀", ownerInitials: "渡辺", closeDate: daysAhead(28), lastActivityDate: daysAgo(6), daysStalled: 6, createdAt: "2025-05-15" },
  { id: "d13", name: "海外拠点向けERP展開", companyId: "c1", companyName: "大和物産株式会社", value: 28500000, stage: "closed_won", probability: 100, ownerId: "u5", ownerName: "伊藤 直樹", ownerInitials: "伊藤", closeDate: daysAgo(5), lastActivityDate: daysAgo(5), daysStalled: 0, createdAt: "2025-02-01" },
  { id: "d14", name: "融資審査AIアシスタント", companyId: "c3", companyName: "サクラ・フィナンシャル", value: 33000000, stage: "closed_won", probability: 100, ownerId: "u5", ownerName: "伊藤 直樹", ownerInitials: "伊藤", closeDate: daysAgo(12), lastActivityDate: daysAgo(12), daysStalled: 0, createdAt: "2025-01-20" },
  { id: "d15", name: "在庫予測ダッシュボード", companyId: "c2", companyName: "北陸精機工業", value: 4200000, stage: "closed_lost", probability: 0, ownerId: "u1", ownerName: "田中 誠", ownerInitials: "田中", closeDate: daysAgo(8), lastActivityDate: daysAgo(8), daysStalled: 0, createdAt: "2025-03-01" },
  { id: "d16", name: "コールセンター基盤クラウド化", companyId: "c9", companyName: "旭化学工業", value: 12500000, stage: "closed_won", probability: 100, ownerId: "u5", ownerName: "伊藤 直樹", ownerInitials: "伊藤", closeDate: daysAgo(19), lastActivityDate: daysAgo(19), daysStalled: 0, createdAt: "2025-01-05" },
  { id: "d17", name: "サプライヤーポータル刷新", companyId: "c4", companyName: "みなと物流サービス", value: 2900000, stage: "negotiation", probability: 60, ownerId: "u3", ownerName: "鈴木 一郎", ownerInitials: "鈴木", closeDate: daysAhead(16), lastActivityDate: daysAgo(19), daysStalled: 19, createdAt: "2025-05-20" },
  { id: "d18", name: "オンライン診療プラットフォーム", companyId: "c5", companyName: "アオゾラ・ヘルスケア", value: 8900000, stage: "qualified", probability: 35, ownerId: "u2", ownerName: "佐藤 美咲", ownerInitials: "佐藤", closeDate: daysAhead(42), lastActivityDate: daysAgo(10), daysStalled: 10, createdAt: "2025-06-08" },
]

export type Activity = {
  id: string
  type: "call" | "email" | "meeting" | "note"
  dealId: string
  dealName: string
  companyName: string
  repName: string
  repInitials: string
  date: string
  summary: string
}

export const activities: Activity[] = [
  { id: "a1", type: "meeting", dealId: "d3", dealName: "リスク管理プラットフォーム拡張", companyName: "サクラ・フィナンシャル", repName: "伊藤 直樹", repInitials: "伊藤", date: daysAgo(1), summary: "最終見積りのレビューを実施。役員承認は来週予定。" },
  { id: "a2", type: "call", dealId: "d1", dealName: "基幹システム更新プロジェクト", companyName: "大和物産株式会社", repName: "伊藤 直樹", repInitials: "伊藤", date: daysAgo(2), summary: "導入スケジュールについて情シス部門と調整。" },
  { id: "a3", type: "email", dealId: "d5", dealName: "電子カルテ連携基盤", companyName: "アオゾラ・ヘルスケア", repName: "佐藤 美咲", repInitials: "佐藤", date: daysAgo(3), summary: "セキュリティ要件に関する追加資料を送付。" },
  { id: "a4", type: "call", dealId: "d7", dealName: "カスタマーサポートAI導入", companyName: "白河テクノロジーズ", repName: "渡辺 由紀", repInitials: "渡辺", date: daysAgo(4), summary: "価格プランの比較検討について協議。" },
  { id: "a5", type: "note", dealId: "d9", dealName: "全社セキュリティ基盤刷新", companyName: "旭化学工業", repName: "伊藤 直樹", repInitials: "伊藤", date: daysAgo(5), summary: "情報システム部長より好意的なフィードバックあり。" },
  { id: "a6", type: "meeting", dealId: "d12", dealName: "賃貸管理システム更新", companyName: "東海リアルエステート", repName: "渡辺 由紀", repInitials: "渡辺", date: daysAgo(6), summary: "デモを実施し、追加機能の要望をヒアリング。" },
  { id: "a7", type: "call", dealId: "d11", dealName: "店舗POS統合", companyName: "湘南ライフスタイル", repName: "高橋 陸", repInitials: "高橋", date: daysAgo(7), summary: "導入店舗数の確定について確認。" },
  { id: "a8", type: "email", dealId: "d6", dealName: "経費精算システムリプレース", companyName: "富士通商株式会社", repName: "高橋 陸", repInitials: "高橋", date: daysAgo(9), summary: "見積書を送付。返信待ち。" },
]

// --- Derived / aggregate metrics used across the dashboard ---

export const kpis = {
  revenueWonMTD: 28500000 + 33000000 * 0.18, // illustrative MTD slice
  revenueWonMTDDisplay: 14250000,
  pipelineValue: deals
    .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0),
  winRate: 34,
  winRateTrend: [28, 29, 31, 30, 33, 34],
  stalledDeals: deals.filter((d) => d.daysStalled > 14 && !["closed_won", "closed_lost"].includes(d.stage)).length,
}

export const pipelineByStage: { stage: DealStage; label: string; value: number; count: number }[] = (
  ["lead", "qualified", "proposal", "negotiation", "closed_won"] as DealStage[]
).map((stage) => {
  const matching = deals.filter((d) => d.stage === stage)
  return {
    stage,
    label: STAGE_LABELS[stage],
    value: matching.reduce((sum, d) => sum + d.value, 0),
    count: matching.length,
  }
})

export const revenueForecastVsActual = [
  { month: "4月", forecast: 32000000, actual: 29500000 },
  { month: "5月", forecast: 35000000, actual: 33800000 },
  { month: "6月", forecast: 38000000, actual: 41200000 },
  { month: "7月", forecast: 40000000, actual: 37600000 },
  { month: "8月", forecast: 42000000, actual: 44900000 },
  { month: "9月", forecast: 45000000, actual: 39100000 },
]

export function getStalledDeals() {
  return deals
    .filter((d) => d.daysStalled > 7 && !["closed_won", "closed_lost"].includes(d.stage))
    .sort((a, b) => b.daysStalled - a.daysStalled)
}

export function getCompanyById(id: string) {
  return companies.find((c) => c.id === id)
}

export function getDealById(id: string) {
  return deals.find((d) => d.id === id)
}

export function getDealsForCompany(companyId: string) {
  return deals.filter((d) => d.companyId === companyId)
}

export function getActivitiesForDeal(dealId: string) {
  return activities.filter((a) => a.dealId === dealId)
}

export function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`
}
