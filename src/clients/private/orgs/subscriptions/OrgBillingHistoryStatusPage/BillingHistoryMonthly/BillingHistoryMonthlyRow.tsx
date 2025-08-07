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
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {OrgBankAccountShowPageRoute} from '^pages/orgs/[id]/bankAccounts/[bankAccountId]';

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
            <td colSpan={2} className="sticky left-0 !bg-white border-r-2 !min-w-md p-0 grid grid-cols-2 min-w-fix">
                {/* 서비스 명 */}
                <div className="!col-span-1 border-r-2 p-4 min-w-60">
                    <OpenButtonColumn
                        href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                    >
                        <SubscriptionProfile subscription={subscription} />
                    </OpenButtonColumn>
                </div>

                {/* 결제수단 */}
                <div className="!col-span-1 p-4">
                    {subscription.creditCardId ? (
                        <OpenButtonColumn
                            href={OrgCreditCardShowPageRoute.path(
                                subscription.organizationId,
                                subscription.creditCardId,
                            )}
                        >
                            <CreditCardProfileCompact item={subscription.creditCard} />
                        </OpenButtonColumn>
                    ) : subscription.bankAccountId ? (
                        <OpenButtonColumn
                            href={OrgBankAccountShowPageRoute.path(
                                subscription.organizationId,
                                subscription.bankAccountId,
                            )}
                        >
                            <BankAccountProfileCompact item={subscription.bankAccount} />
                        </OpenButtonColumn>
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
