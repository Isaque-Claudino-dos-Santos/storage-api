import { Router } from 'express'
import TestAgent from 'supertest/lib/agent';

export default abstract class BaseServer {
    abstract setRouters(routers: Router[]): void
    abstract start(): void
    abstract mockRequest(): TestAgent
}
