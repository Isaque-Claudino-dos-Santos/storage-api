import { Request } from 'express'
import { Result, ValidationError } from 'express-validator'

export default abstract class BaseValidations {
    public abstract validate(request: Request): Promise<Result<ValidationError>>
}
