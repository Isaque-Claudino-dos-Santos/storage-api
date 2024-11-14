import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import BaseServer from '../Server/Bases/BaseServer.js'
import HttpServer from '../Server/HttpServer.js'
import ApplicationConfig from './ApplicationConfig.js'

export default class Application {
    public readonly config: ApplicationConfig = new ApplicationConfig()
    public readonly server: BaseServer = new HttpServer()
    public readonly prisma: PrismaClient = new PrismaClient()

    constructor() {}

    withRouters(...routers: Router[]): this {
        this.server.setRouters(routers)
        return this
    }

    initialize() {
        this.server.start()
    }
}
