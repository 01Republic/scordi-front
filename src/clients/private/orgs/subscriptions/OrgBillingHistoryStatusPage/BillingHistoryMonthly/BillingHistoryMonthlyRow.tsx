import React, {memo} from 'react';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {CurrencyCode} from '^models/Money';
import {SubscriptionProfile} from '^models/Subscription/components';

interface BillingHistoryMonthlyRowProps {
    data: BillingHistoriesMonthlySumBySubscriptionDto;
    ratio: number;
    renderColumns: (items: BillingHistoriesMonthlySumBySubscriptionDto['items']) => JSX.Element[];
    exchangeRate: number;
}

export const BillingHistoryMonthlyRow = memo((props: BillingHistoryMonthlyRowProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {data, ratio, renderColumns, exchangeRate} = props;
    const {subscription, items} = data;

    const currentCode = subscription.currentBillingAmount?.code;
    const symbol = displayCurrency === CurrencyCode.KRW ? '₩' : subscription.currentBillingAmount?.symbol;
    // const fixedAmount = (amount: number) => toFixedAmount(amount, subscription.currentBillingAmount?.code)
    const displayCost = (amount: number, code?: string) => {
        if (displayCurrency === 'KRW' || code === 'KRW') {
            return Number(amount.toFixed(0)).toLocaleString();
        } else {
            return Number(amount.toFixed(2)).toLocaleString();
        }
    };

    return (
        <tr className="group">
            <td className="sticky left-0 bg-white min-w-40 flex z-10 border-r-2">
                <SubscriptionProfile subscription={subscription} textClassName="font-medium" />
            </td>
            <td>
                <IsFreeTierTagUI value={subscription.isFreeTier || false} />
            </td>
            <td className={'text-right font-medium'}>{ratio.toFixed(1)}%</td>
            <td className={'text-right font-medium'}>
                {symbol} {displayCost(data.getCostSum(exchangeRate, displayCurrency))}
            </td>
            <td className={'text-right font-medium'}>
                {symbol} {displayCost(data.getAverageCost(exchangeRate, displayCurrency), currentCode)}
            </td>
            {renderColumns(items)}
        </tr>
    );
});

BillingHistoryMonthlyRow.displayName = 'BillingHistoryMonthlyRow';
