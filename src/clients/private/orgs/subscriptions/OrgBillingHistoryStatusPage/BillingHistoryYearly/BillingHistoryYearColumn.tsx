import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^models/Money';
import {toFixedAmount} from '^models/Money/components/toFixedAmount';

type YearlySumItemDto = BillingHistoriesYearlySumBySubscriptionDto['items'][0];

interface BillingHistoryYearColumnProps {
    currentData?: YearlySumItemDto;
    previousData?: YearlySumItemDto;
    exchangeRate: number;
}

export const BillingHistoryYearColumn = memo((props: BillingHistoryYearColumnProps) => {
    const {currentData, previousData, exchangeRate} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    if (!currentData) return <td className="text-right">-</td>;

    const currentAmount = currentData.getCurrentAmount(exchangeRate, displayCurrency);

    const colorClass = (() => {
        if (!previousData) return '';
        const previousAmount = previousData.getCurrentAmount(exchangeRate, displayCurrency);

        if (currentAmount > previousAmount) return 'text-red-500 bg-red-50';
        if (currentAmount < previousAmount) return 'text-blue-500 bg-blue-50';
        return '';
    })();

    const symbol = displayCurrency === CurrencyCode.KRW ? '₩' : currentData.symbol;
    const fixedAmount = toFixedAmount(currentAmount, currentData.code, displayCurrency);

    return (
        <td className={`text-right`}>
            {symbol} {fixedAmount.toLocaleString()}
        </td>
    );
});
BillingHistoryYearColumn.displayName = 'BillingHistoryYearColumn';
