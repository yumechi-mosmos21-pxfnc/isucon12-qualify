
// 内部型定義
export type TenantWithBilling = {
  id: string
  name: string
  display_name: string
  billing: number
}

export type TenantDetail = {
  name: string
  display_name: string
}

export type BillingReport = {
  competition_id: string
  competition_title: string
  player_count: number // スコアを登録した参加者数
  visitor_count: number // ランキングを閲覧だけした(スコアを登録していない)参加者数
  billing_player_yen: number // 請求金額 スコアを登録した参加者分
  billing_visitor_yen: number // 請求金額 ランキングを閲覧だけした(スコアを登録していない)参加者分
  billing_yen: number // 合計請求金額
}

export type PlayerDetail = {
  id: string
  display_name: string
  is_disqualified: boolean
}

export type CompetitionDetail = {
  id: string
  title: string
  is_finished: boolean
}

export type PlayerScoreDetail = {
  competition_title: string
  score: number
}

export type CompetitionRank = {
  rank: number
  score: number
  player_id: string
  player_display_name: string
}

export type WithRowNum = {
  row_num: number
}

// アクセスしてきた人の情報
export type Viewer = {
  role: string
  playerId: string
  tenantName: string
  tenantId: number
}

// レスポンス型定義
export type TenantsAddResult = {
  tenant: TenantWithBilling
}

export type InitializeResult = {
  lang: string
}

export type PlayersListResult = {
  players: PlayerDetail[]
}

export type PlayersAddResult = {
  players: PlayerDetail[]
}

export type PlayerDisqualifiedResult = {
  player: PlayerDetail
}

export type CompetitionsAddResult = {
  competition: CompetitionDetail
}

export type ScoreResult = {
  rows: number
}

export type BillingResult = {
  reports: BillingReport[]
}

export type CompetitionsResult = {
  competitions: CompetitionDetail[]
}

export type PlayerResult = {
  player: PlayerDetail
  scores: PlayerScoreDetail[]
}
export type CompetitionRankingResult = {
  competition: CompetitionDetail
  ranks: CompetitionRank[]
}

export type MeResult = {
  tenant: TenantDetail
  me: PlayerDetail | null
  role: string
  logged_in: boolean
}

// DB型定義
export interface TenantRow {
  id: number
  name: string
  display_name: string
  created_at?: number
  updated_at?: number
}

export interface CompetitionRow {
  tenant_id: number
  id: string
  title: string
  finished_at: number | null
  created_at: number
  updated_at: number
}

export interface VisitHistorySummaryRow {
  player_id: string
  min_created_at: number
}

export interface PlayerRow {
  tenant_id: number
  id: string
  display_name: string
  is_disqualified: number
  created_at: number
  updated_at: number
}

export interface PlayerScoreRow {
  tenant_id: number
  id: string
  player_id: string
  competition_id: string
  score: number
  row_num: number
  created_at: number
  updated_at: number
}
