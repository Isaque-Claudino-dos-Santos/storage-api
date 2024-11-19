import { log } from 'console'
import express, { Express, Router } from 'express'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'
import Env from '../../constants/Env'
import BaseServer from './Bases/BaseServer'
import ServerConfig from './ServerConfig'

export default class HttpServer extends BaseServer {
    private readonly app: Express = express()
    private readonly config: ServerConfig = new ServerConfig()
    private routers: Router[] = []

    setRouters(routers: Router[]) {
        this.routers = routers
    }

    start() {
        this.app.use(express.json())

        this.routers.forEach((router) => this.app.use(router))
        
        if (Env.NODE_ENV === 'test') return

        this.app.listen(Env.SERVER_PORT, Env.SERVER_HOST, () => {
            log(`Opened server in ${this.config.url}`)
        })
    }

    mockRequest(): TestAgent {
        return supertest(this.app)
    }
}
