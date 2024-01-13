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
        .replace(/\D/g, '')
        .trim()
        .replace(/(.{4})/g, '$1 - ')
        .replace(/ - $/, '');
};
