import React, {memo} from 'react';
import {locales} from '^utils/locale-helper';
import {SelectDropdown} from '^v3/share/Select';
import {useRouter} from 'next/router';
import {useCurrentLocale} from '^hooks/useCurrentLocale';
import {useTranslation} from 'next-i18next';

export const LocaleDropdown = memo(function LocaleDropdown() {
    const router = useRouter();
    const {currentLocale} = useCurrentLocale();
    const {t} = useTranslation('publicFooter');

    return (
        <SelectDropdown
            placeholder={t('lang.placeholder')!}
            options={locales.map((locale) => ({
                value: locale.code,
                text: locale.text,
                selected: currentLocale === locale.code,
            }))}
            onChange={(selected) => router.push('', '', {locale: selected.value})}
        />
    );
});
