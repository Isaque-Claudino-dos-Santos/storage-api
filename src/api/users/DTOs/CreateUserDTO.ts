import { Request } from 'express'
import BaseDTO from '../../Bases/BaseDTO.js'

export default class CreateUserDTO extends BaseDTO {
    public readonly firstName: string
    public readonly lastName: string
    public readonly email: string
    public readonly password: string

    constructor(request: Request) {
        super(request)

        const { body } = request

        this.firstName = body.firstName
        this.lastName = body.lastName
        this.email = body.email
        this.password = body.password
    }
}
