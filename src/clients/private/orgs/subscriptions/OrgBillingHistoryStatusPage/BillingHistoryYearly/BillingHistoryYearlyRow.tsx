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
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {OrgBankAccountShowPageRoute} from '^pages/orgs/[id]/bankAccounts/[bankAccountId]';
import {WithChildren} from '^types/global.type';

interface BillingHistoryYearlyRowProps extends WithChildren {
    data: BillingHistoriesYearlySumBySubscriptionDto;
    renderColumns: (items: BillingHistoriesYearlySumBySubscriptionDto['items']) => JSX.Element[];
    exchangeRate: number;
}

export const BillingHistoryYearlyRow = memo((props: BillingHistoryYearlyRowProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {data, renderColumns, exchangeRate, children} = props;
    const {subscription, items} = data;

    const symbol = displayCurrency === CurrencyCode.KRW ? '₩' : subscription.currentBillingAmount?.symbol;
    const averageCost =
        symbol === '₩'
            ? Number(data.getAverageCost(exchangeRate, displayCurrency).toFixed(0)).toLocaleString()
            : Number(data.getAverageCost(exchangeRate, displayCurrency).toFixed(2)).toLocaleString();

    return (
        <tr className="group">
            <td colSpan={2} className="sticky left-0 !bg-white p-0 min-w-max">
                <div className="w-full grid grid-cols-2 min-w-max border-r-2">
                    {/* 서비스 명 */}
                    <div className="p-4 min-w-max">
                        <OpenButtonColumn
                            href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                        >
                            <SubscriptionProfile subscription={subscription} />
                        </OpenButtonColumn>
                    </div>

                    {/* 결제수단 */}
                    <div className="p-4 min-w-max">
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
                </div>
            </td>

            <td className="text-right">
                <IsFreeTierTagUI value={subscription.isFreeTier} />
            </td>
            <td className="text-right font-medium">
                {symbol} {averageCost}
            </td>
            {renderColumns(items)}
            {children}
        </tr>
    );
});
BillingHistoryYearlyRow.displayName = 'BillingHistoryYearlyRow';
