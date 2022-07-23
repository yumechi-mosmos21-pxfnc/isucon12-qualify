import { getEnv } from "./get_env";
import { TenantRow } from "./types";
import { Request } from "express";
import { adminDB } from "./admin_db";
import { RowDataPacket } from "mysql2/promise";

export async function retrieveTenantRowFromHeader(req: Request): Promise<TenantRow | undefined> {
  // JWTに入っているテナント名とHostヘッダのテナント名が一致しているか確認
  const baseHost = getEnv('ISUCON_BASE_HOSTNAME', '.t.isucon.dev')
  const tenantName = req.hostname.replace(baseHost, '')

  // SaaS管理者用ドメイン
  if (tenantName === 'admin') {
    return {
      id: 0,
      name: 'admin',
      display_name: 'admin',
    }
  }

  // テナントの存在確認
  try {
    const [[tenantRow]] = await adminDB.query<(TenantRow & RowDataPacket)[]>('SELECT * FROM tenant WHERE name = ?', [
      tenantName,
    ])
    return tenantRow
  } catch (error) {
    throw new Error(`failed to Select tenant: name=${tenantName}, ${error}`)
  }
}
