import { OkPacket } from 'mysql2/promise'
import { adminDB } from "./admin_db";

// システム全体で一意なIDを生成する
export async function dispenseID(): Promise<string> {
  let id = 0
  let lastErr: any
  for (const _ of Array(100)) {
    try {
      const [result] = await adminDB.execute<OkPacket>('REPLACE INTO id_generator (stub) VALUES (?)', ['a'])

      id = result.insertId
      break
    } catch (error: any) {
      // deadlock
      if (error.errno && error.errno === 1213) {
        lastErr = error
      }
    }
  }
  if (id !== 0) {
    return id.toString(16)
  }

  throw new Error(`error REPLACE INTO id_generator: ${lastErr.toString()}`)
}
