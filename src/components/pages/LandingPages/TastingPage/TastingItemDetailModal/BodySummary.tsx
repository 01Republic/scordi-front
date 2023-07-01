import React, {memo} from 'react';
import {changePriceCurrency, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useTranslation} from 'next-i18next';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '../pageAtoms';
import {GmailItem} from '^api/tasting.api';
import {dayjs} from '^utils/dayjs';

interface BodySummaryProps {
    sortedItems: GmailItem[];
}

export const BodySummary = memo((props: BodySummaryProps) => {
    const {sortedItems} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {t} = useTranslation('publicTasting');

    const oldest = sortedItems[sortedItems.length - 1];
    const since = dayjs(new Date(oldest.metadata.date)).fromNow();

    const getTotalBalance = (gmailItems: GmailItem[]) => {
        if (gmailItems.length === 0) return 0;
        let amount = 0;
        gmailItems.forEach((item) => {
            const {price} = item;
            if (price.hide) return;
            if (!isNaN(price.amount)) {
                // console.log('priceAmount', price.amount);
                // console.log('item', item);
                amount += changePriceCurrency(price.amount, price.currency, displayCurrency);
            }
        });
        return amount;
    };

    return (
        <>
            <p className="font-semibold mb-3" dangerouslySetInnerHTML={{__html: t('result_in_since_n_ago', {since})}} />

            <div className="flex items-center justify-around pb-6">
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.invoice.label')}</p>
                    <p className="font-semibold text-18">
                        <span className="">{sortedItems.length}</span>
                        <small>&nbsp;{t('summary_stat.invoice.unit')}</small>
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">{t('summary_stat.balance.label')}</p>
                    <p className="font-semibold text-18">
                        <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                        <span className="">{getTotalBalance(sortedItems).toLocaleString()}</span>
                        {/*<small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>*/}
                    </p>
                </div>
            </div>
        </>
    );
});
