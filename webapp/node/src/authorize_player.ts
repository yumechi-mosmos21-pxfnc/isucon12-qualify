import { Database } from "sqlite";
import { retrievePlayer } from "./retrive_player";
import { ErrorWithStatus } from "./error_with_status";

// 参加者を認可する
// 参加者向けAPIで呼ばれる
export async function authorizePlayer(tenantDB: Database, id: string): Promise<Error | undefined> {
  try {
    const player = await retrievePlayer(tenantDB, id)
    if (!player) {
      throw new ErrorWithStatus(401, 'player not found')
    }
    if (player.is_disqualified) {
      throw new ErrorWithStatus(403, 'player is disqualified')
    }
    return
  } catch (error) {
    return error as Error
  }
}
