import { param, ValidationChain } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'

export default class ParamIdValidation extends BaseValidations {
    public validate(): ValidationChain[] {
        return [param('id').isInt()]
    }
}
