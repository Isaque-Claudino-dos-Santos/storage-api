import { body, query, ValidationChain } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'

export default class UpdateUserValidations extends BaseValidations {
    validate(): ValidationChain[] {
        return [
            body('firstName').isString().toLowerCase(),
            body('lastName').isString().toLowerCase(),
            body('email').isEmail(),
            body('password').isString(),
            query('id').isInt(),
        ]
    }
}
