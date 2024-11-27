import { body, ValidationChain } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'
import ParamIdValidation from '../../Global/Validations/ParamIdValidation'

export default class UpdateUserValidations extends BaseValidations {
    protected extends = [ParamIdValidation]

    validate(): ValidationChain[] {
        return [
            body('firstName').isString().toLowerCase(),
            body('lastName').isString().toLowerCase(),
            body('email').isEmail(),
            body('password').isString(),
        ]
    }
}
