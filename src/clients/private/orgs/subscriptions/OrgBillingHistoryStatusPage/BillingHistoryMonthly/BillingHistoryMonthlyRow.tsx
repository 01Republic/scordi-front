import React, {memo} from 'react';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {CurrencyCode} from '^models/Money';
import {SubscriptionProfile} from '^models/Subscription/components';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {WideMode} from '../../OrgBillingHistoryStatusPage';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {CreditCardProfileCompact} from '^models/CreditCard/components';

interface BillingHistoryMonthlyRowProps {
    data: BillingHistoriesMonthlySumBySubscriptionDto;
    ratio: number;
    renderColumns: (items: BillingHistoriesMonthlySumBySubscriptionDto['items']) => JSX.Element[];
    exchangeRate: number;
    wideMode?: WideMode;
    stickyPos?: number;
}

export const BillingHistoryMonthlyRow = memo((props: BillingHistoryMonthlyRowProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {data, ratio, renderColumns, exchangeRate, wideMode = WideMode.Narrow, stickyPos = 0} = props;
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

    const isHidden = wideMode === WideMode.WideHideColumn;

    return (
        <tr className="group">
            <td className="sticky left-0 bg-white min-w-64 flex z-10 border-r-2">
                <div className="w-full">
                    <OpenButtonColumn
                        href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                    >
                        <SubscriptionProfile subscription={subscription} />
                    </OpenButtonColumn>
                </div>
            </td>
            <td className={isHidden ? 'hidden' : ''} />

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

            {/* 상태 */}
            <td className={isHidden ? 'hidden' : ''}>
                <IsFreeTierTagUI value={subscription.isFreeTier || false} />
            </td>

            {/* 지출 비중 */}
            <td className={isHidden ? 'hidden' : 'text-right font-medium min-w-28'}>{ratio.toFixed(2)}%</td>

            {/* 총 지출액 */}
            <td className={'text-right font-medium min-w-28'}>
                {symbol} {displayCost(data.getCostSum(exchangeRate, displayCurrency), currentCode)}
            </td>

            {/* 평균지출액 */}
            <td className={'text-right font-medium min-w-28'}>
                {symbol} {displayCost(data.getAverageCost(exchangeRate, displayCurrency), currentCode)}
            </td>

            {renderColumns(items)}
        </tr>
    );
});

BillingHistoryMonthlyRow.displayName = 'BillingHistoryMonthlyRow';
