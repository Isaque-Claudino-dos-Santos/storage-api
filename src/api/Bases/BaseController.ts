import { Router } from 'express'
import BaseErrorHandler from './BaseErrorHandler'

export default class BaseController {
    public static readonly errorsHandlers: BaseErrorHandler['handle'][] = []

    public readonly router: Router = Router()
}
