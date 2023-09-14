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
