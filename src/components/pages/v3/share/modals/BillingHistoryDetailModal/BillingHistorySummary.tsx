import React, {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {useTranslation} from 'next-i18next';
import {dayjs} from '^utils/dayjs';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {getTotalBalance} from '^components/pages/LandingPages/TastingPage/hooks/useSummaryStatBalance';
import {useRouter} from 'next/router';
import {BillingHistoryManager} from '^models/BillingHistory';

interface BillingHistorySummaryProps {
    billingHistories: BillingHistoryDto[];
}

export const BillingHistorySummary = memo((props: BillingHistorySummaryProps) => {
    const router = useRouter();
    const {billingHistories} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {t} = useTranslation('org-home');

    dayjs.locale(router.locale);

    const BillingHistory = BillingHistoryManager.init(billingHistories).validateToListing();
    const oldest = BillingHistory.oldestIssue().take();
    const since = oldest ? dayjs(oldest.issuedAt).fromNow() : '??';

    return (
        <>
            <p className="font-semibold mb-3" dangerouslySetInnerHTML={{__html: t('result_in_since_n_ago', {since})}} />

            <div className="flex items-center justify-around pb-6">
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.counter.label')}</p>
                    <p className="font-semibold text-18">
                        <span className="">{BillingHistory.length}</span>
                        <small>&nbsp;{t('summary_stat.counter.unit')}</small>
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.balance.label')}</p>
                    <p className="font-semibold text-18">
                        <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                        <span className="">
                            {getTotalBalance(BillingHistory.toArray(), displayCurrency).toLocaleString()}
                        </span>
                        {/*<small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>*/}
                    </p>
                </div>
            </div>
        </>
    );
});
