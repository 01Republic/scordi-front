import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {SubscriptionProfile} from '^models/Subscription/components';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^models/Money';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {BankAccountProfileCompact} from '^models/BankAccount/components';

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
            <td className="sticky left-0 bg-white min-w-64 flex z-10 border-r-2">
                <div className="w-full">
                    <OpenButtonColumn
                        href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                    >
                        <SubscriptionProfile subscription={subscription} textClassName="font-medium" />
                    </OpenButtonColumn>
                </div>
            </td>

            {/* 결제수단 */}
            <td className="font-medium min-w-28">
                <div className="flex justify-end">
                    {subscription.creditCard ? (
                        <CreditCardProfileCompact item={subscription.creditCard} />
                    ) : subscription.bankAccount ? (
                        <BankAccountProfileCompact item={subscription.bankAccount} />
                    ) : (
                        <p>-</p>
                    )}
                </div>
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
