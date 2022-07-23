import mysql from 'mysql2/promise'

// 管理用DBに接続する
const dbConfig = {
  host: process.env['ISUCON_DB_HOST'] ?? '127.0.0.1',
  port: Number(process.env['ISUCON_DB_PORT'] ?? 3306),
  user: process.env['ISUCON_DB_USER'] ?? 'isucon',
  password: process.env['ISUCON_DB_PASSWORD'] ?? 'isucon',
  database: process.env['ISUCON_DB_NAME'] ?? 'isucon_listen80',
}
export const adminDB = mysql.createPool(dbConfig)
