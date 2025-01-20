import React from 'react';
import cn from 'classnames';
import {Avatar} from '^components/Avatar';
import {currencyFormat, roundNumber} from '^utils/number';
import {BillingHistoryStatus, t_billingHistoryStatusForDashboard} from '^models/BillingHistory/type';
import {SummaryOfBillingHistoriesDto} from '^types/dashboard.type';

interface ExpenseSubscriptionProps {
    summary?: SummaryOfBillingHistoriesDto;
    currentStatusTab?: BillingHistoryStatus;
}

export const ExpenseStatusTabContent = (props: ExpenseSubscriptionProps) => {
    const {summary, currentStatusTab = BillingHistoryStatus.PayWait} = props;
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

    // 로딩이 아직 안되었거나, 결과가 없는 경우
    if (subscriptionSpends.length === 0) {
        return (
            <div
                className={cn('w-full rounded-2xl flex items-center justify-center bg-white border py-10', {
                    'border-orange-100 text-orange-400': currentStatusTab === BillingHistoryStatus.PayWait,
                    'border-gray-100 text-gray-400': currentStatusTab === BillingHistoryStatus.PaySuccess,
                    'border-red-100 text-red-400': currentStatusTab === BillingHistoryStatus.PayFail,
                })}
            >
                <p>{`${t_billingHistoryStatusForDashboard(currentStatusTab)}된 지출액이 없어요.`}</p>
            </div>
        );
    }

    return (
        <div
            className={cn('w-full rounded-2xl grid grid-cols-3 gap-2 p-2', {
                'bg-orange-100 ': currentStatusTab === BillingHistoryStatus.PayWait,
                'bg-gray-100': currentStatusTab === BillingHistoryStatus.PaySuccess,
                'bg-red-100': currentStatusTab === BillingHistoryStatus.PayFail,
            })}
        >
            {subscriptionSpends.map((spend) => (
                <div
                    key={spend.subscription.id}
                    className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
                    onClick={() => console.log(spend)}
                >
                    <div className="flex items-center gap-3">
                        <Avatar
                            src={spend.subscription.product.image}
                            className="w-5 h-5"
                            draggable={false}
                            loading="lazy"
                        />
                        <p>{spend.subscription.product.name()}</p>
                    </div>

                    <p>{currencyFormat(roundNumber(spend.amount))}</p>
                </div>
            ))}
        </div>
    );
};
