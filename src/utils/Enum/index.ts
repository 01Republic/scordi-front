export function Enum<T extends object>(enumObj: T): EnumObject<T> {
    return EnumObject.init<T>(enumObj);
}

class EnumObject<T extends object> {
    obj: T;
    data: Record<string, T>;
    constructor(enumObj: T) {
        this.obj = enumObj;
        this.data = EnumObject.toObject(enumObj);
    }

    static toObject<T extends object>(enumObj: T) {
        const values = Object.values(enumObj)
            .filter((a) => typeof a === 'number')
            .map(String);
        const entries = Object.entries(enumObj).filter(([k, v]) => !values.includes(k)) as [string, T][];
        return entries.reduce((acc, [k, v]) => {
            acc[k] = v;
            return acc;
        }, {} as Record<string, T>);
    }

    static init<T extends object>(enumObj: T) {
        return new this(enumObj);
    }

    get entries() {
        return Object.entries(this.data);
    }

    get keys() {
        return Object.keys(this.data);
    }

    get values() {
        return Object.values(this.data);
    }
}
