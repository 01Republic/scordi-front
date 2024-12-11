import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^models/Money';
import {Currency} from '^types/crawler';

interface BillingHistoryYearlyRowProps {
    data: BillingHistoriesYearlySumBySubscriptionDto;
    renderColumns: (items: BillingHistoriesYearlySumBySubscriptionDto['items']) => JSX.Element[];
    exchangeRate: number;
}

export const BillingHistoryYearlyRow = memo((props: BillingHistoryYearlyRowProps) => {
    const [displayCurrency] = useRecoilState(displayCurrencyAtom);
    const {data, renderColumns, exchangeRate} = props;
    const {subscription, items} = data;

    const symbol = displayCurrency === CurrencyCode.KRW ? '₩' : subscription.currentBillingAmount?.symbol;
    const averageCost = data.getAverageCost(exchangeRate, displayCurrency);

    return (
        <tr className="group">
            <td className="sticky left-0 bg-white z-10">
                <SubscriptionProfile subscription={subscription} className="font-medium" />
            </td>
            <td className="text-right">
                <IsFreeTierTagUI value={subscription.isFreeTier} />
            </td>
            <td className="text-right font-medium">
                {symbol} {averageCost.toLocaleString()}
            </td>
            {renderColumns(items)}
        </tr>
    );
});
BillingHistoryYearlyRow.displayName = 'BillingHistoryYearlyRow';
