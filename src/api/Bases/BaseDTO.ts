import { Request } from 'express'

export default abstract class BaseDTO {
    constructor(private readonly request: Request) {}
}
