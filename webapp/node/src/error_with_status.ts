// カスタムエラーハンドラにステータスコード拾ってもらうエラー型
export class ErrorWithStatus extends Error {
  public status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = new.target.name
    this.status = status
  }
}
