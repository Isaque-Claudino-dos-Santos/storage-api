import { URLSearchParams } from 'url'

export default class URLQuery {
    private readonly param = new URLSearchParams()

    constructor(private readonly uri: string) {}

    toString() {
        return `${this.uri}?${this.param.toString()}`
    }

    set(key: string, value: string | number) {
        this.param.set(key, String(value))
        return this
    }
}
