import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {useTranslation} from 'next-i18next';
import {isShowInvoiceAppsModalState} from '../InvoiceAppsModal';
import {useSummaryStatServices} from '../hooks/useSummaryStatServices';
import {useSummaryStatInvoices} from '../hooks/useSummaryStatInvoices';
import {SummarySectionContainer} from './share/SummarySectionContainer';
import {SummarySectionItem} from './share/SummarySectionItem';
import {useDraftResult} from '../hooks/useDraft';

export const SummarySectionMobile = memo(() => {
    const {isLoaded} = useDraftResult();
    const setInvoiceAppsModalOpen = useSetRecoilState(isShowInvoiceAppsModalState);
    useSummaryStatServices('detected-services2');
    useSummaryStatInvoices('detected-invoices2');
    const {t} = useTranslation('publicTasting');

    return (
        <SummarySectionContainer>
            <SummarySectionItem label={t('summary_stat.services.label')} onClick={() => setInvoiceAppsModalOpen(true)}>
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
