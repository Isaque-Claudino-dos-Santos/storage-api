import { Request } from 'express'
import {
    body,
    Result,
    ValidationError,
    validationResult,
} from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations.js'

export default class UpdateUserValidations extends BaseValidations {
    public async validate(request: Request): Promise<Result<ValidationError>> {
        await body('firstName').isString().toLowerCase().run(request)
        await body('lastName').isString().toLowerCase().run(request)
        await body('email').isEmail().run(request)
        await body('password').isString().run(request)

        return validationResult(request)
    }
}
