// 環境変数を取得する、なければデフォルト値を返す
export function getEnv(key: string, defaultValue: string): string {
  const val = process.env[key]
  if (val !== undefined) {
    return val
  }

  return defaultValue
}
