import React, {memo} from 'react';
import {changePriceCurrency, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useTranslation} from 'next-i18next';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '../pageAtoms';
import {dayjs} from '^utils/dayjs';
import {BillingHistoryDto} from '^types/billing.type';
import {getTotalBalance} from '^components/pages/LandingPages/TastingPage/hooks/useSummaryStatBalance';

interface BodySummaryProps {
    billingHistories: BillingHistoryDto[];
}

export const BodySummary = memo((props: BodySummaryProps) => {
    const {billingHistories} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {t} = useTranslation('publicTasting');

    const oldest = billingHistories[billingHistories.length - 1];
    const since = dayjs(oldest.issuedAt).fromNow();

    return (
        <>
            <p className="font-semibold mb-3" dangerouslySetInnerHTML={{__html: t('result_in_since_n_ago', {since})}} />

            <div className="flex items-center justify-around pb-6">
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.invoice.label')}</p>
                    <p className="font-semibold text-18">
                        <span className="">{billingHistories.length}</span>
                        <small>&nbsp;{t('summary_stat.invoice.unit')}</small>
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.balance.label')}</p>
                    <p className="font-semibold text-18">
                        <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                        <span className="">{getTotalBalance(billingHistories, displayCurrency).toLocaleString()}</span>
                        {/*<small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>*/}
                    </p>
                </div>
            </div>
        </>
    );
});
