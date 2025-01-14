import React from 'react';
import cn from 'classnames';
import {Avatar} from '^components/Avatar';
import {SubscriptionDto} from '^models/Subscription/types';
import {currencyFormat} from '^utils/number';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {BillingHistoryStatus, t_billingHistoryStatusForDashboard} from '^models/BillingHistory/type';

interface ExpenseSubscriptionProps {
    currentStatusTab?: BillingHistoryStatus;
    subscriptions: SubscriptionDto[];
}

export const ExpenseStatusTabContent = (props: ExpenseSubscriptionProps) => {
    const {subscriptions, currentStatusTab = BillingHistoryStatus.PayWait} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    // 로딩이 아직 안되었거나, 결과가 없는 경우
    if (subscriptions.length === 0) {
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
            {subscriptions.map((subscription) => (
                <div
                    key={subscription.id}
                    className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
                >
                    <div className="flex items-center gap-3">
                        <Avatar src={subscription.product.image} className="w-5 h-5" draggable={false} loading="lazy" />
                        <p>{subscription.product.nameKo}</p>
                    </div>

                    <p>
                        {currencyFormat(
                            subscription.currentBillingAmount
                                ? subscription.currentBillingAmount.toDisplayPrice(displayCurrency)
                                : 0,
                        )}
                    </p>
                </div>
            ))}
        </div>
    );
};
