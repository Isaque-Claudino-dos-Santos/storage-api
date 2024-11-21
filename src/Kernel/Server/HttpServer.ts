import { log } from 'console'
import express, { Express, RequestHandler } from 'express'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'
import BaseController from '../../api/Bases/BaseController'
import Env from '../../constants/Env'
import BaseServer from './Bases/BaseServer'
import ServerConfig from './ServerConfig'

export default class HttpServer extends BaseServer {
    private readonly app: Express = express()
    private readonly config: ServerConfig = new ServerConfig()
    private readonly controllers: (typeof BaseController)[] = []

    private buildRouterByControllers() {
        this.controllers.forEach((controllerClass) => {
            const controller = Reflect.construct(controllerClass, [])
            this.use(controller.router)
        })
    }

    addController(...controller: (typeof BaseController)[]): void {
        controller.forEach((c) => this.controllers.push(c))
    }

    use(...handler: RequestHandler[]) {
        this.app.use(handler)
    }

    start() {
        this.app.use(express.json())

        this.buildRouterByControllers()

        if (Env.NODE_ENV === 'test') return

        this.app.listen(Env.SERVER_PORT, Env.SERVER_HOST, () => {
            log(`Opened server in ${this.config.url}`)
        })
    }

    mockRequest(): TestAgent {
        return supertest(this.app)
    }
}
