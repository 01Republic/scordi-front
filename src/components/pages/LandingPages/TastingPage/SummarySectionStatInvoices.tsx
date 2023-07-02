import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom} from './pageAtoms';
import {useTranslation} from 'next-i18next';
import {useSummaryStatInvoices} from './hooks/useSummaryStatInvoices';

export const SummarySectionStatInvoices = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const {t} = useTranslation('publicTasting');
    useSummaryStatInvoices('detected-invoices');

    return (
        <div className="stats bg-[#fafafa] shadow-xl md:w-[20%]">
            <div className="stat place-items-center py-7">
                <div className="stat-title !text-black !opacity-100 font-semibold mb-3">
                    {t('summary_stat.invoice.label')}
                </div>
                <div
                    className={`stat-value !text-2xl text-primary ${
                        !isLoaded ? 'w-full bg-slate-300 rounded-full animate-pulse' : ''
                    }`}
                >
                    <span id="detected-invoices" className="!text-4xl" />
                    <small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>
                </div>
            </div>
        </div>
    );
});
