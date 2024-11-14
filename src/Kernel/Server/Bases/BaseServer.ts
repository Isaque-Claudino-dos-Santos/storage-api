import { Router } from 'express'

export default abstract class BaseServer {
    abstract setRouters(routers: Router[]): void
    abstract start(): void
}
