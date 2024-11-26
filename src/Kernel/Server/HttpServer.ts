import { log } from 'console'
import express, { Express } from 'express'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'
import BaseController from '../../api/Bases/BaseController'
import BaseErrorHandler from '../../api/Bases/BaseErrorHandler'
import Env from '../../constants/Env'
import { EndPointOptions } from '../Decorators/server-decorator'
import BaseServer from './Bases/BaseServer'
import ServerConfig from './ServerConfig'

export default class HttpServer extends BaseServer {
    private readonly app: Express = express()
    private readonly config: ServerConfig = new ServerConfig()
    private readonly controllers: (typeof BaseController)[] = []
    private readonly errorsHandlers: (typeof BaseErrorHandler)[] = []

    private buildErrorsHandlersInRouters() {
        if (this.errorsHandlers.length) {
            const handlers = this.errorsHandlers.map((errorClass) => {
                const error = Reflect.construct(errorClass, [])
                return error.handle
            })

            this.app.use(handlers)
        }
    }

    private buildRouterByControllers() {
        this.controllers.forEach((controllerClass) => {
            Reflect.construct(controllerClass, [])

            const metadataKey = Reflect.ownKeys(controllerClass).filter(
                (key) =>
                    typeof key === 'symbol' &&
                    key.description === 'Symbol.metadata'
            )[0]

            const metadata = Reflect.get(controllerClass, metadataKey)
            const router = Reflect.get(metadata, 'global/router')
            const options = Reflect.get(
                metadata,
                'global/options'
            ) as EndPointOptions
            
            this.app.use(options.prefix ?? '/', router)
        })
    }

    addController(...controller: (typeof BaseController)[]): void {
        this.controllers.push(...controller)
    }

    addErrorsHandlers(...handlers: (typeof BaseErrorHandler)[]): void {
        this.errorsHandlers.push(...handlers)
    }

    start() {
        this.app.use(express.json())

        this.buildRouterByControllers()
        this.buildErrorsHandlersInRouters()

        if (this.errorsHandlers.length) {
            const handlers = this.errorsHandlers.map((errorClass) => {
                const error = Reflect.construct(errorClass, [])
                return error.handle
            })

            this.app.use(handlers)
        }

        if (Env.NODE_ENV === 'test') return

        this.app.listen(Env.SERVER_PORT, Env.SERVER_HOST, () => {
            log(`Opened server in ${this.config.url}`)
        })
    }

    mockRequest(): TestAgent {
        return supertest(this.app)
    }
}
