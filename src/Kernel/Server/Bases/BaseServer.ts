import { RequestHandler } from 'express'
import TestAgent from 'supertest/lib/agent'
import BaseController from '../../../api/Bases/BaseController'
import BaseErrorHandler from '../../../api/Bases/BaseErrorHandler'

export default abstract class BaseServer {
    abstract use(...handler: RequestHandler[]): void
    abstract start(): void
    abstract mockRequest(): TestAgent
    abstract addController(...controller: (typeof BaseController)[]): void
    abstract addErrorsHandlers(...handlers: (typeof BaseErrorHandler)[]): void
}
