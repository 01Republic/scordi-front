export const shouldStartWith = (char: string, value: string): string => {
    if (value.startsWith(char)) return value;
    return `${char}${value}`;
};

export function buildLocalePath(redirectPath?: string, locale?: string): string {
    if (!redirectPath) return '';
    if (!locale) return redirectPath;

    return `/${locale}${shouldStartWith('/', redirectPath)}`;
}
