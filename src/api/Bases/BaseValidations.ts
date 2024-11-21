import { ValidationChain } from 'express-validator'

export default abstract class BaseValidations {
    protected extends: (new () => BaseValidations)[] = []

    protected abstract validate(): ValidationChain[]

    handler() {
        const validations = this.validate()

        this.extends.forEach((extendedValidationsClass) => {
            const extendedValidations = Reflect.construct(
                extendedValidationsClass,
                []
            )
            validations.concat(extendedValidations.validate())
        })

        return validations
    }
}
