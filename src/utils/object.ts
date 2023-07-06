const deepCopyArray = <T>(arr: T[]): T[] => arr.map((item) => deepCopy(item));

export function deepCopy<T extends any>(obj: T): T {
    if (obj instanceof Array) return deepCopyArray(obj) as T;

    const clone = {} as T;

    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] != null) {
            clone[key] = deepCopy(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;
}
