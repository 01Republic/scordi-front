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
