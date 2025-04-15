export const uniq = <T>(iter: T[]): T[] => {
    return iter.filter((a, i) => iter.indexOf(a) === i);
};

// export const splitChunk = <T>(chunkSize: number, arr: T[]) => {
//     return [].concat.apply(
//         [],
//         arr.map((elem, i) => {
//             return i % chunkSize ? [] : [arr.slice(i, i + chunkSize)];
//         }),
//     );
// };

export const captures = (str: string, regex: RegExp) => {
    const [_, ...matches] = str.match(regex) || [];
    return matches;
};

export const reverseArr = <T>(arr: T[]) => arr.slice().reverse();
export const firstOf = <T>(arr: T[], n = 1) => arr.slice(0, n);
export const lastOf = <T>(arr: T[], n = 1) => firstOf(reverseArr(arr), n).reverse();

export const undef = <T>(d: T): T | undefined => d;

export const isDefinedValue = <T>(value: T | undefined | null): value is T => !!value;
