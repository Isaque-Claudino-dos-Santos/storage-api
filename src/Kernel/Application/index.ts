import BaseController from '../../api/Bases/BaseController'
import BaseServer from '../Server/Bases/BaseServer'
import HttpServer from '../Server/HttpServer'
import ApplicationConfig from './ApplicationConfig'

export default class Application {
    public readonly config: ApplicationConfig = new ApplicationConfig()
    public readonly server: BaseServer = new HttpServer()

    withController(...controller: (typeof BaseController)[]): this {
        this.server.addController(...controller)
        return this
    }

    initialize() {
        this.server.start()
    }
}
