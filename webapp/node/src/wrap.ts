import { Request, Response, NextFunction, RequestHandler } from 'express'

// see: https://expressjs.com/en/advanced/best-practice-performance.html#handle-exceptions-properly
export const wrap =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>): RequestHandler =>
    (req, res, next) =>
      fn(req, res, next).catch(next)
