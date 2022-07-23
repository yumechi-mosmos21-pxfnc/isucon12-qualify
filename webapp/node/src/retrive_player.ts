import { Database } from "sqlite";
import { PlayerRow } from "./types";

// 参加者を取得する
export async function retrievePlayer(tenantDB: Database, id: string): Promise<PlayerRow | undefined> {
  try {
    const playerRow = await tenantDB.get<PlayerRow>('SELECT * FROM player WHERE id = ?', id)
    return playerRow
  } catch (error) {
    throw new Error(`error Select player: id=${id}, ${error}`)
  }
}
