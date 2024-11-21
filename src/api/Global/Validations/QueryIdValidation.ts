import { query, ValidationChain } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'

export default class QueryIdValidation extends BaseValidations {
    public validate(): ValidationChain[] {
        return [query('id').isInt()]
    }
}
