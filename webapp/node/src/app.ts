import express, { Request, Response, NextFunction, RequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

export const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'private')
  next()
})
app.set('etag', false)
