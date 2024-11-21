import BaseController from '../api/Bases/BaseController'
import BaseMiddleware from '../api/Bases/BaseMiddleware'
import BaseValidations from '../api/Bases/BaseValidations'

type HttpMethods = 'get' | 'post' | 'delete' | 'put' | 'patch'

export default class Api {
    private static baseRoute(
        method: HttpMethods,
        uri: string,
        validationClass?: new () => BaseValidations,
        ...middleware: BaseMiddleware[]
    ) {
        return function (target: unknown, context: DecoratorContext) {
            context.addInitializer(function () {
                const methodName = context.name

                if (
                    typeof methodName !== 'string' ||
                    context.kind !== 'method' ||
                    context.private
                ) {
                    return
                }

                const controller = this as BaseController
                const handler = Reflect.get(controller, methodName)

                const validation =
                    validationClass && Reflect.construct(validationClass, [])
                const validations = validation ? validation.handler() : []

                controller.router[method](
                    uri,
                    validations,
                    handler,
                    middleware.map((middleware) => middleware.handle)
                )
            })
        }
    }

    static Get(
        uri: string,
        validationClass?: new () => BaseValidations,
        ...middleware: BaseMiddleware[]
    ) {
        return Api.baseRoute('get', uri, validationClass, ...middleware)
    }

    static Post(
        uri: string,
        validationClass?: new () => BaseValidations,
        ...middleware: BaseMiddleware[]
    ) {
        return Api.baseRoute('post', uri, validationClass, ...middleware)
    }

    static Put(
        uri: string,
        validationClass?: new () => BaseValidations,
        ...middleware: BaseMiddleware[]
    ) {
        return Api.baseRoute('put', uri, validationClass, ...middleware)
    }

    static Patch(
        uri: string,
        validationClass?: new () => BaseValidations,
        ...middleware: BaseMiddleware[]
    ) {
        return Api.baseRoute('patch', uri, validationClass, ...middleware)
    }

    static Delete(
        uri: string,
        validationClass?: new () => BaseValidations,
        ...middleware: BaseMiddleware[]
    ) {
        return Api.baseRoute('delete', uri, validationClass, ...middleware)
    }
}
