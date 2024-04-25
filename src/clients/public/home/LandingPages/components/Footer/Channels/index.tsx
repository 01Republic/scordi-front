import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {SocialIcons} from './SocialIcons';
import {LocaleDropdown} from './LocaleDropdown';

export const Channels = memo(function Channels() {
    const {t} = useTranslation('publicFooter');

    return (
        <div>
            <p className="text-[15px] font-semibold mb-[16px]">{t('channels.heading')}</p>
            <SocialIcons />

            <div>
                <LocaleDropdown />
            </div>
        </div>
    );
});
