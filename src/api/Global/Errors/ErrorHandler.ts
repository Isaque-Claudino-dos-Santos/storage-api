import { NextFunction, Request, Response } from 'express'
import BaseErrorHandler from '../../Bases/BaseErrorHandler'

export default class ErrorHandler extends BaseErrorHandler {
    handle(
        _err: unknown,
        _req: Request,
        _res: Response,
        _next: NextFunction
    ): void {
        console.log(_err)
        _res.send('Hello World Error braw')
    }
}
