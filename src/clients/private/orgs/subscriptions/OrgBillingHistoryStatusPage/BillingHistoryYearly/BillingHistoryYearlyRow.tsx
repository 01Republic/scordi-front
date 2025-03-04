import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {SubscriptionProfile} from '^models/Subscription/components';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^models/Money';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';

interface BillingHistoryYearlyRowProps {
    data: BillingHistoriesYearlySumBySubscriptionDto;
    renderColumns: (items: BillingHistoriesYearlySumBySubscriptionDto['items']) => JSX.Element[];
    exchangeRate: number;
}

export const BillingHistoryYearlyRow = memo((props: BillingHistoryYearlyRowProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {data, renderColumns, exchangeRate} = props;
    const {subscription, items} = data;

    const symbol = displayCurrency === CurrencyCode.KRW ? '₩' : subscription.currentBillingAmount?.symbol;
    const averageCost =
        symbol === '₩'
            ? Number(data.getAverageCost(exchangeRate, displayCurrency).toFixed(0)).toLocaleString()
            : Number(data.getAverageCost(exchangeRate, displayCurrency).toFixed(2)).toLocaleString();

    return (
        <tr className="group">
            <td className="sticky left-0 bg-white z-10">
                <OpenButtonColumn
                    href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                >
                    <SubscriptionProfile subscription={subscription} textClassName="font-medium" />
                </OpenButtonColumn>
            </td>
            <td className="text-right">
                <IsFreeTierTagUI value={subscription.isFreeTier} />
            </td>
            <td className="text-right font-medium">
                {symbol} {averageCost}
            </td>
            {renderColumns(items)}
        </tr>
    );
});
BillingHistoryYearlyRow.displayName = 'BillingHistoryYearlyRow';
