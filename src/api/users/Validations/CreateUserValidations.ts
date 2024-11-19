import { Request } from 'express'
import { body, validationResult } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'

export default class CreateUserValidations extends BaseValidations {
    async validate(request: Request) {
        await body('firstName').notEmpty().isString().toLowerCase().run(request)
        await body('lastName').notEmpty().isString().toLowerCase().run(request)
        await body('email').notEmpty().isEmail().run(request)
        await body('password').notEmpty().isString().run(request)

        return validationResult(request)
    }
}
