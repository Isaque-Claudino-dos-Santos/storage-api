import { body, ValidationChain } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'
import QueryIdValidation from '../../Global/Validations/QueryIdValidation'

export default class UpdateUserValidations extends BaseValidations {
    protected extends = [QueryIdValidation]

    validate(): ValidationChain[] {
        return [
            body('firstName').isString().toLowerCase(),
            body('lastName').isString().toLowerCase(),
            body('email').isEmail(),
            body('password').isString(),
        ]
    }
}
