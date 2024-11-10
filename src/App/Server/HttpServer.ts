import express, { Express } from 'express'
import Env from '../../constants/Env.js'
import router from '../routes.js'
import ServerConfig from './ServerConfig.js'
import { log } from 'console'

export default class HttpServer {
    private readonly app: Express = express()
    private readonly config: ServerConfig = new ServerConfig();

    start() {
        this.app.use(router)

        this.app.listen(Env.SERVER_PORT, Env.SERVER_HOST, () => {
            log(`Opened server in ${this.config.url}`)
        })
    }
}
