import {singular} from 'pluralize';
import {snakeCase} from 'lodash';

export {plural, singular} from 'pluralize';
export {snakeCase} from 'lodash';

export const truncate = (str: string, size: number, suffix = '...') => {
    const newStr = str.substring(0, size);
    return str.length === newStr.length ? newStr : [newStr, suffix].join(' ');
};

export const isValidUrl = (urlString: string) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};

export const onlyNumber = (str: string): [number, string] => {
    const [intStr, extra] = str
        .replace(/[^\d\.]/g, '')
        .replace(/\.(\d*)$/, '-$1')
        .replace(/\./g, '')
        .split('-');

    const pureNumber = parseFloat([intStr, extra].join('.') || '0');

    const formattedText = (() => {
        const arr = [Number(intStr).toLocaleString()];
        if (typeof extra != 'undefined') arr.push(extra);
        return arr.join('.');
    })();

    return [pureNumber, formattedText];
};

export const cardNumberFormat = (str: string) => {
    return str
        .replace(/[^\d^\*]/g, '')
        .trim()
        .replace(/(.{4})/g, '$1 - ')
        .replace(/ - $/, '');
};

// more: https://stackoverflow.com/a/53952925
export function pascalCase(str: string) {
    return str
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

export function classify(str: string) {
    return pascalCase(singular(snakeCase(str)));
}

export function slugify(str: string) {
    return snakeCase(str).replace(/[_\s]/g, '-');
}
