import { query, ValidationChain } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'

export default class UsersPaginationValidations extends BaseValidations {
    validate(): ValidationChain[] {
        return [
            query('limit').toInt().default(30),

            query('user_ids')
                .customSanitizer((value) => value?.split(',') ?? [])
                .toInt()
                .customSanitizer((value) => value?.filter(Boolean) ?? [])
                .default([]),

            query('order_by')
                .customSanitizer((value) => (value === 'desc' ? 'desc' : 'asc'))
                .default('asc'),

            query('order_by_column').default('id'),
            query('page').toInt().default(1),
        ]
    }
}
