import BaseController from '../api/Bases/BaseController'
import BaseValidations from '../api/Bases/BaseValidations'
import Arr from '../Helpers/Arr'

type HttpMethods = 'get' | 'post' | 'delete' | 'put' | 'patch'

export function Route(
    method: HttpMethods,
    uri: string,
    validationClass?: new () => BaseValidations
) {
    return (_: undefined, context: DecoratorContext) => {
        context.addInitializer(function () {
            const methodName = context.name
            const invalidsKinds = ['class', 'setter', 'accessor', 'getter']

            if (
                typeof methodName !== 'string' ||
                Arr.someEquals(invalidsKinds, context.kind)
            ) {
                return
            }

            const controller = this as BaseController
            const handler = Reflect.get(controller, methodName)

            const validation =
                validationClass && Reflect.construct(validationClass, [])
            const validations = validation ? validation.handler() : []
            
            controller.router[method](uri, validations, handler)
        })
    }
}
