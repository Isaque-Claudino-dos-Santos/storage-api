export default class Arr {
    static someEquals(arr: unknown[], b: unknown): boolean {
        return arr.some((a) => a === b)
    }
}
