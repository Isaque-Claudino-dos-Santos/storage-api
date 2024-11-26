export default class Arr {
    static someEquals(arr: unknown[], b: unknown): boolean {
        return arr.some((a) => a === b)
    }

    static contruct<T>(arr: T[]): T[] {
        return arr
            .map((c) => {
                if (typeof c === 'function') {
                    return Reflect.construct(c, [])
                }
                return null
            })
            .filter(Boolean)
    }

    static columns<T>(arr: T[], key: keyof T) {
        return arr
            .map((value) => {
                return value[key]
            })
            .filter(Boolean)
    }
}
