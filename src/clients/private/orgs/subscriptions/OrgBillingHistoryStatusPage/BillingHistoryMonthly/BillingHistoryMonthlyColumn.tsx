import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^models/Money';
import {toFixedAmount} from '^models/Money/components/toFixedAmount';

type MonthlySumItemDto = BillingHistoriesMonthlySumBySubscriptionDto['items'][0];

interface BillingHistoryMonthlyColumnProps {
    currentData?: MonthlySumItemDto;
    previousData?: MonthlySumItemDto;
    exchangeRate: number;
}

export const BillingHistoryMonthlyColumn = memo((props: BillingHistoryMonthlyColumnProps) => {
    const {currentData, previousData, exchangeRate} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    if (!currentData) return <td className="text-right min-w-28">-</td>;

    const currentAmount = currentData?.getCurrentAmount(exchangeRate, displayCurrency) || 0;
    const previousAmount = previousData?.getCurrentAmount(exchangeRate, displayCurrency) || 0;
    const isHigher = currentAmount > previousAmount;
    const isLower = currentAmount < previousAmount;

    const symbol = displayCurrency === CurrencyCode.KRW ? '₩' : currentData?.symbol;
    const fixedAmount = toFixedAmount(currentAmount, currentData.code, displayCurrency);

    return (
        <td
            className={`text-right font-light min-w-28 ${
                isHigher ? 'text-red-500 bg-red-50' : isLower ? 'text-blue-500 bg-blue-50' : ''
            }`}
        >
            {symbol} {fixedAmount.toLocaleString()}
        </td>
    );
});
BillingHistoryMonthlyColumn.displayName = 'BillingHistoryMonthlyColumn';
