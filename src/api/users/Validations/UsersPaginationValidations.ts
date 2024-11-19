import { Request } from 'express'
import { query, validationResult } from 'express-validator'
import BaseValidations from '../../Bases/BaseValidations'

export default class UsersPaginationValidations extends BaseValidations {
    async validate(request: Request) {
        await query('limit').toInt().default(30).run(request)

        await query('user_ids')
            .customSanitizer((value) => value?.split(',') ?? [])
            .toInt()
            .customSanitizer((value) => value?.filter(Boolean) ?? [])
            .default([])
            .run(request)

        await query('order_by')
            .customSanitizer((value) => (value === 'desc' ? 'desc' : 'asc'))
            .default('asc')
            .run(request)

        await query('order_by_column').default('id').run(request)

        await query('page').toInt().default(1).run(request)

        return validationResult(request)
    }
}
