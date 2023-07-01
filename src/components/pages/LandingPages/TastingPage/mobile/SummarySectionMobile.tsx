import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTranslation} from 'next-i18next';
import {gmailItemsLoadedAtom} from '../pageAtoms';
import {useSummaryStatServices} from '../SummarySectionStatServices';
import {useSummaryStatInvoices} from '../SummarySectionStatInvoices';
import {SummarySectionContainer} from './share/SummarySectionContainer';
import {SummarySectionItem} from './share/SummarySectionItem';

export const SummarySectionMobile = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    useSummaryStatServices('detected-services2');
    useSummaryStatInvoices('detected-invoices2');
    const {t} = useTranslation('publicTasting');

    return (
        <SummarySectionContainer>
            <SummarySectionItem label={t('summary_stat.services.label')}>
                <span id="detected-services2" />
                <small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.services.unit')}</small>
            </SummarySectionItem>

            <SummarySectionItem label={t('summary_stat.invoice.label')}>
                <span id="detected-invoices2" />
                <small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>
            </SummarySectionItem>
        </SummarySectionContainer>
    );
});
