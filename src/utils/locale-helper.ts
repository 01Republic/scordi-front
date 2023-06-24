import {UserLocale} from '^types/user.type';

export const locales = [
    {code: UserLocale.Ko, text: '한국어'},
    {code: UserLocale.En, text: 'English'},
];

export const shouldStartWith = (char: string, value: string): string => {
    if (value.startsWith(char)) return value;
    return `${char}${value}`;
};

export function buildLocalePath(redirectPath?: string, locale?: string): string {
    if (!redirectPath) return '';
    if (!locale) return redirectPath;

    return `/${locale}${shouldStartWith('/', redirectPath)}`;
}
