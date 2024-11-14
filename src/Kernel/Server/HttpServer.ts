import { log } from 'console'
import express, { Express, Router } from 'express'
import Env from '../../constants/Env.js'
import ServerConfig from './ServerConfig.js'
import BaseServer from './Bases/BaseServer.js'

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

        this.app.listen(Env.SERVER_PORT, Env.SERVER_HOST, () => {
            log(`Opened server in ${this.config.url}`)
        })
    }
}
