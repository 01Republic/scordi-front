import React, {memo} from 'react';
import {TermLinkItem} from '../ui/TermLinkItem';
import {useTranslation} from 'next-i18next';

export const TermLinks = memo(function TermLinks() {
    const {t} = useTranslation('publicFooter');

    return (
        <ul className="menu menu-horizontal gap-2 text-gray-500">
            <TermLinkItem
                href="https://api.scordi.io/terms/serviceUsageTerm-v20221101-1.txt"
                name={t('terms.serviceUsage')}
            />
            <TermLinkItem
                href="https://api.scordi.io/terms/개인정보처리방침-v20221101-1.html"
                name={t('terms.privacy')}
            />
        </ul>
    );
});
