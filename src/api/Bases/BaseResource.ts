export default abstract class BaseResource<T> {
    constructor(protected readonly data: T) {}
    
    abstract resolve(): unknown
}
