import { log } from 'console'
import express, { Express, Router } from 'express'
import Env from '../../constants/Env.js'
import ServerConfig from './ServerConfig.js'

export default class HttpServer {
    private readonly app: Express = express()
    private readonly config: ServerConfig = new ServerConfig()

    start(routers: Router[]) {
        this.app.use(express.json())

        routers.forEach((router) => this.app.use(router))

        this.app.listen(Env.SERVER_PORT, Env.SERVER_HOST, () => {
            log(`Opened server in ${this.config.url}`)
        })
    }
}
