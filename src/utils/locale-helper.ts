import {TFunction} from 'i18next';
import {UserLocale} from '^models/User/types';

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

/**
 *
 */
export function localeDateHelper(c: TFunction<'common', undefined, 'common'>) {
    const rangeScoping = (scope: string) => (value: number | string, unit?: string) => {
        if (!unit && typeof value === 'string') {
            return c(`date.range.${scope}`, {value: c(`date.${value}`)});
        }
        return c(`date.range.${scope}`, {value: `${value}${c(`date.${unit}`)}`});
    };

    return {
        l: (...str: string[]) => {},
        range: {
            all: () => c('date.range.all'),
            recent: rangeScoping('recent'),
            this: rangeScoping('this'),
            last: rangeScoping('last'),
        },
    };
}
