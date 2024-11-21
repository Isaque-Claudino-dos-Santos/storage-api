import BaseController from '../../api/Bases/BaseController'
import BaseServer from '../Server/Bases/BaseServer'
import HttpServer from '../Server/HttpServer'
import ApplicationConfig from './ApplicationConfig'

export default class Application {
    public readonly config: ApplicationConfig = new ApplicationConfig()
    public readonly server: BaseServer = new HttpServer()
    private readonly controllers: BaseController[] = []

    withController(...controller: (typeof BaseController)[]): this {
        controller.forEach((c) => this.controllers.push(new c()))
        return this
    }

    private buildControllers(): void {
        this.controllers.forEach((controller) => {
            this.server.setRouters(controller.router)
        })
    }

    initialize() {
        this.buildControllers()
        this.server.start()
    }
}
