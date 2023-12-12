export const uniq = <T>(iter: T[]): T[] => {
    return iter.filter((a, i) => iter.indexOf(a) === i);
};
