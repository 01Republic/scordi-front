import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^models/Money';

type YearlySumItemDto = BillingHistoriesYearlySumBySubscriptionDto['items'][0];

interface BillingHistoryYearColumnProps {
    currentData?: YearlySumItemDto;
    previousData?: YearlySumItemDto;
    exchangeRate: number;
}

export const BillingHistoryYearColumn = memo((props: BillingHistoryYearColumnProps) => {
    const {currentData, previousData, exchangeRate} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    if (!currentData) return <td className="text-right">N/A</td>;

    const currentAmount = currentData.getCurrentAmount(exchangeRate, displayCurrency);

    const colorClass = (() => {
        if (!previousData) return '';
        const previousAmount = previousData.getCurrentAmount(exchangeRate, displayCurrency);

        if (currentAmount > previousAmount) return 'text-red-500 bg-red-50';
        if (currentAmount < previousAmount) return 'text-blue-500 bg-blue-50';
        return '';
    })();

    const symbol = displayCurrency === CurrencyCode.KRW ? '₩' : currentData.symbol;

    const fixedAmount = (() => {
        if (displayCurrency === CurrencyCode.KRW || currentData.code === CurrencyCode.KRW) {
            return Number(currentAmount.toFixed(0));
        }

        return Number(currentAmount.toFixed(2));
    })();

    return (
        <td className={`text-right ${colorClass}`}>
            {symbol} {fixedAmount.toLocaleString()}
        </td>
    );
});
BillingHistoryYearColumn.displayName = 'BillingHistoryYearColumn';
