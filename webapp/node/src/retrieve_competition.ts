import { Database } from "sqlite";
import { CompetitionRow } from "./types";

// 大会を取得する
export async function retrieveCompetition(tenantDB: Database, id: string): Promise<CompetitionRow | undefined> {
  try {
    const competitionRow = await tenantDB.get<CompetitionRow>('SELECT * FROM competition WHERE id = ?', id)
    return competitionRow
  } catch (error) {
    throw new Error(`error Select competition: id=${id}, ${error}`)
  }
}
