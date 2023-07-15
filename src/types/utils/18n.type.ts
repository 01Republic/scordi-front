import {useTranslation} from 'next-i18next';
import {TFunction} from 'i18next';

export enum LocalList {
    KO = 'ko',
    EN = 'en',
}

export const publicPageRequires = ['common', 'sign', 'profile', 'publicFooter'];
export const v3CommonRequires = ['common', 'sign', 'profile'];

export function useI18n<T extends string>(localeFilenames: T[]) {
    // @ts-ignore
    const tSet: Record<T, TFunction<T>> = {};
    localeFilenames.forEach((localeFilename) => {
        const {t} = useTranslation(localeFilename);
        tSet[localeFilename] = t;
    });

    return {t: tSet};
}
