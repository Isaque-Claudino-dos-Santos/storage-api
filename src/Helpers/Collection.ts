import Arr from './Arr'

export default class Collection<D> {
    private data: D[] = []

    constructor(data: D[]) {
        this.data = data
    }

    static create<T>(data: T[]) {
        return new Collection<T>(data)
    }

    construct() {
        /* eslint-disable */
        const newData = Arr.contruct(this.data)
        /* @ts-ignore */
        return new Collection<InstanceType<D>>(newData)
    }

    columns(key: keyof D) {
        const newData = Arr.columns(this.data, key)
        return new Collection(newData)
    }

    get() {
        return this.data
    }
}
