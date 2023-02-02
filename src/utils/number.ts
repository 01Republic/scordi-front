/**
 * Number
 */

export const currencyFormat = (num: number, unit = '원', format = '%n%u'): string => {
    return `${format || '%n%u'}`.replace('%u', unit).replace('%n', num.toLocaleString());
};

// 반올림
export const roundNumber = (num: number, pos = 0): number => {
    return Math.round(num * 10 ** pos) / 10 ** pos;
};

// 올림
export const ceilNumber = (num: number, pos = 0): number => {
    return Math.ceil(num * 10 ** pos) / 10 ** pos;
};

// 버림
export const floorNumber = (num: number, pos = 0): number => {
    return Math.floor(num * 10 ** pos) / 10 ** pos;
};
