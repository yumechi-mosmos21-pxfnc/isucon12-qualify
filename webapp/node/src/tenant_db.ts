import path from 'path'
import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { getEnv } from "./get_env";
import { useSqliteTraceHook } from "./sqltrace";
import childProcess from 'child_process'
import util from "util";
import { tenantDBSchemaFilePath } from "./constants";

const exec = util.promisify(childProcess.exec)

// テナントDBのパスを返す
function tenantDBPath(id: number): string {
  const tenantDBDir = getEnv('ISUCON_TENANT_DB_DIR', '../tenant_db')
  return path.join(tenantDBDir, `${id.toString()}.db`)
}

// テナントDBに接続する
export async function connectToTenantDB(id: number): Promise<Database> {
  const p = tenantDBPath(id)
  let db: Database
  try {
    db = await open({
      filename: p,
      driver: sqlite3.Database,
    })
    db.configure('busyTimeout', 5000)

    const traceFilePath = getEnv('ISUCON_SQLITE_TRACE_FILE', '')
    if (traceFilePath) {
      db = useSqliteTraceHook(db, traceFilePath)
    }
  } catch (error) {
    throw new Error(`failed to open tenant DB: ${error}`)
  }

  return db
}

// テナントDBを新規に作成する
export async function createTenantDB(id: number): Promise<Error | undefined> {
  const p = tenantDBPath(id)

  try {
    await exec(`sh -c "sqlite3 ${p} < ${tenantDBSchemaFilePath}"`)
  } catch (error: any) {
    return new Error(`failed to exec "sqlite3 ${p} < ${tenantDBSchemaFilePath}", out=${error.stderr}`)
  }
}
