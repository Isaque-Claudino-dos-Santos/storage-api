import { log } from 'console'
import express, { Express, RequestHandler } from 'express'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'
import BaseController from '../../api/Bases/BaseController'
import BaseErrorHandler from '../../api/Bases/BaseErrorHandler'
import Env from '../../constants/Env'
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

            this.use(...handlers)
        }
    }
    
    private buildRouterByControllers() {
        this.controllers.forEach((controllerClass) => {
            const controller = Reflect.construct(controllerClass, [])
            const { router } = controller

            if (controllerClass.errorsHandlers.length) {
                router.use(controllerClass.errorsHandlers)
            }

            this.use(router)
        })
    }

    addController(...controller: (typeof BaseController)[]): void {
        this.controllers.push(...controller)
    }

    addErrorsHandlers(...handlers: (typeof BaseErrorHandler)[]): void {
        this.errorsHandlers.push(...handlers)
    }

    use(...handler: RequestHandler[]) {
        this.app.use(handler)
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

            this.use(...handlers)
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
