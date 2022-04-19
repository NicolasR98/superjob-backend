import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

/**
 * Middleware to parse any `express` request with `zod` parser method
 * @param schema Any schema created with `zod`
 * @returns express request verified or throws error response status
 */
const validateResource = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (err: any) {
      return res.status(400).send(err.errors)
    }
  }

export default validateResource
