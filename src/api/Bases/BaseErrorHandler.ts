import { NextFunction, Request, Response } from 'express'

export default abstract class BaseErrorHandler {
    abstract handle(
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
    ): void
}
