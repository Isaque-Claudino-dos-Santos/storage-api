import { body, ValidationChain } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'

export default class CreateUserValidations extends BaseValidations {
    validate(): ValidationChain[] {
        return [
            body('firstName').notEmpty().isString(),
            body('lastName').notEmpty().isString(),
            body('email').notEmpty().isEmail(),
            body('password').notEmpty().isString(),
        ]
    }
}
