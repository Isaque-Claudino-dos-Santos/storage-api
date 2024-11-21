import { NextFunction, Request, Response } from 'express'

export default abstract class BaseMiddleware {
    abstract handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): void
}
