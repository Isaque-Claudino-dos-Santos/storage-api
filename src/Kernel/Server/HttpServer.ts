import { log } from 'console'
import express, { Express } from 'express'
import router from '../../App/routes.js'
import Env from '../../constants/Env.js'
import ServerConfig from './ServerConfig.js'

export default class HttpServer {
    private readonly app: Express = express()
    private readonly config: ServerConfig = new ServerConfig()

    start() {
        this.app.use(router)

        this.app.listen(Env.SERVER_PORT, Env.SERVER_HOST, () => {
            log(`Opened server in ${this.config.url}`)
        })
    }
}
