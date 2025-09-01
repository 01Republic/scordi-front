import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {CurrencyCode} from '^models/Money';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {SubscriptionProfile} from '^models/Subscription/components';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {OrgBankAccountShowPageRoute} from '^pages/orgs/[id]/bankAccounts/[bankAccountId]';
import {WideMode} from '../../OrgBillingHistoryStatusPage';
import {FixedTdGroup} from '../fixed/FixedTdGroup';

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

    const Columns = [
        // 서비스 명
        () => (
            <div className="peer w-48 overflow-hidden">
                <OpenButtonColumn
                    href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                >
                    <SubscriptionProfile
                        subscription={subscription}
                        textClassName="text-sm font-base overflow-ellipsis overflow-hidden"
                    />
                </OpenButtonColumn>
            </div>
        ),

        // 결제수단
        () => (
            <div className="peer w-48 overflow-hidden">
                {subscription.creditCardId ? (
                    <OpenButtonColumn
                        href={OrgCreditCardShowPageRoute.path(subscription.organizationId, subscription.creditCardId)}
                    >
                        <CreditCardProfileCompact item={subscription.creditCard} />
                    </OpenButtonColumn>
                ) : subscription.bankAccountId ? (
                    <OpenButtonColumn
                        href={OrgBankAccountShowPageRoute.path(subscription.organizationId, subscription.bankAccountId)}
                    >
                        <BankAccountProfileCompact item={subscription.bankAccount} />
                    </OpenButtonColumn>
                ) : (
                    <p>-</p>
                )}
            </div>
        ),

        ...(isHidden
            ? []
            : [
                  // 상태
                  () => (
                      <div className="peer w-28 text-center">
                          <IsFreeTierTagUI value={subscription.isFreeTier || false} />
                      </div>
                  ),

                  // 지출 비중
                  () => <div className="peer w-28 text-right font-medium min-w-28">{ratio.toFixed(2)}%</div>,
              ]),

        // 총 지출액
        () => (
            <div className="peer w-28 text-right font-medium">
                {symbol} {displayCost(data.getCostSum(exchangeRate, displayCurrency), currentCode)}
            </div>
        ),

        // 평균지출액
        () => (
            <div className="peer w-28 text-right font-medium">
                {symbol} {displayCost(data.getAverageCost(exchangeRate, displayCurrency), currentCode)}
            </div>
        ),
    ];

    return (
        <tr className="group">
            {stickyPos > 0 && <FixedTdGroup Columns={Columns.slice(0, stickyPos)} />}
            {Columns.slice(stickyPos).map((Column, i) => (
                <td key={i}>
                    <Column />
                </td>
            ))}
            {renderColumns(items)}
        </tr>
    );
});

BillingHistoryMonthlyRow.displayName = 'BillingHistoryMonthlyRow';
