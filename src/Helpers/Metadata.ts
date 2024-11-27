type Target = Record<string, unknown>

export type MetadataSetOptions = {
    key: string
    value: unknown
}

export type MetadataGetOptions = {
    key: string
    defaultValue?: unknown
}

export type MetadataAppendOptions = {
    key: string
    value: unknown[]
}

export default class Metadata {
    private readonly id: string
    private readonly target: Target

    constructor(id: string, target: Target) {
        this.id = id
        this.target = target
    }

    private getTargetKey(key: string) {
        return `${this.id}:${key}`
    }

    set(options: MetadataSetOptions) {
        const { key, value } = options
        const _key = this.getTargetKey(key)
        Reflect.set(this.target, _key, value)
        return this
    }

    get<T>(options: MetadataGetOptions) {
        const { key, defaultValue } = options
        const _key = this.getTargetKey(key)
        return (Reflect.get(this.target, _key) ?? defaultValue) as T
    }

    append(options: MetadataAppendOptions) {
        const { key, value } = options
        const oldValue = this.get<unknown[]>({
            key,
            defaultValue: [],
        })
        oldValue.push(...value)
        this.set({
            key,
            value: oldValue,
        })
        return this
    }
}
