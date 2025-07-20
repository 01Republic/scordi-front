import React from 'react';
import cn from 'classnames';
import {currencyFormat, roundNumber} from '^utils/number';
import {SummaryOfBillingHistoriesDto} from '^types/dashboard.type';
import {BillingHistoryStatus, t_billingHistoryStatusForDashboard} from '^models/BillingHistory/type';
import {SubscriptionProfile} from '^models/Subscription/components';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {LinkTo} from '^components/util/LinkTo';
import {useTranslation} from 'next-i18next';

interface ExpenseSubscriptionProps {
    summary?: SummaryOfBillingHistoriesDto;
    currentStatusTab?: BillingHistoryStatus;
}

export const ExpenseStatusTabContent = (props: ExpenseSubscriptionProps) => {
    const {summary, currentStatusTab = BillingHistoryStatus.PayWait} = props;
    const {t} = useTranslation('dashboard');
    const summaryOfState = (() => {
        switch (currentStatusTab) {
            case BillingHistoryStatus.PayWait:
                return summary?.pending;
            case BillingHistoryStatus.PaySuccess:
                return summary?.success;
            case BillingHistoryStatus.PayFail:
                return summary?.failure;
            default:
                return undefined;
        }
    })();
    const subscriptionSpends = summaryOfState?.subscriptionSpends || [];
    // const url = ;

    // 로딩이 아직 안되었거나, 결과가 없는 경우
    if (subscriptionSpends.length === 0) {
        return (
            <div
                className={cn('w-full rounded-2xl flex items-center justify-center bg-white border py-10', {
                    'border-emerald-100 text-emerald-400': currentStatusTab === BillingHistoryStatus.PaySuccess,
                    'border-orange-100 text-orange-400': currentStatusTab === BillingHistoryStatus.PayWait,
                    'border-red-100 text-red-400': currentStatusTab === BillingHistoryStatus.PayFail,
                })}
            >
                <p>{t('expenseStatus.noHistory', {status: t_billingHistoryStatusForDashboard(currentStatusTab)})}</p>
            </div>
        );
    }

    return (
        <div
            className={cn('w-full rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2', {
                'bg-emerald-100': currentStatusTab === BillingHistoryStatus.PaySuccess,
                'bg-orange-100 ': currentStatusTab === BillingHistoryStatus.PayWait,
                'bg-red-100': currentStatusTab === BillingHistoryStatus.PayFail,
            })}
        >
            {subscriptionSpends.map((spend) => (
                <LinkTo
                    href={OrgSubscriptionDetailPageRoute.path(spend.organizationId, spend.subscriptionId)}
                    key={spend.subscription.id}
                    className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
                >
                    <SubscriptionProfile
                        subscription={spend.subscription}
                        width={20}
                        height={20}
                        className="gap-3"
                        textClassName="text-14 font-base font-normal"
                        isAlias={false}
                    />
                    <p>{currencyFormat(roundNumber(spend.amount))}</p>
                </LinkTo>
            ))}
        </div>
    );
};
