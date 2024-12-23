import React from 'react';
import cn from 'classnames';
import {Avatar} from '^components/Avatar';

import {SubscriptionDto} from '^models/Subscription/types';
import {currencyFormat} from '^utils/number';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {ExpenseStatusType} from '^clients/private/orgs/home/OrgDashboardPage/MonthlyTotalExpenseSection/index';

interface ExpenseSubscriptionProps {
    subscriptions: SubscriptionDto[];
    expenseStatus: ExpenseStatusType;
}

export const ExpenseSubscription = (props: ExpenseSubscriptionProps) => {
    const {subscriptions, expenseStatus} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    return (
        <>
            {subscriptions.length > 0 ? (
                <div
                    className={cn('w-full rounded-2xl grid grid-cols-3 gap-2 p-2', {
                        'bg-orange-100 ': expenseStatus === '예정',
                        'bg-gray-100': expenseStatus === '완료',
                        'bg-red-100': expenseStatus === '실패',
                    })}
                >
                    {subscriptions.map((subscription) => (
                        <div
                            key={subscription.id}
                            className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
                        >
                            <div className="flex items-center gap-3">
                                <Avatar
                                    src={subscription.product.image}
                                    className="w-5 h-5"
                                    draggable={false}
                                    loading="lazy"
                                />
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
            ) : (
                <div
                    className={cn('w-full rounded-2xl flex items-center justify-center bg-white border py-10', {
                        'border-orange-100  text-orange-400': expenseStatus === '예정',
                        ' border-gray-100 text-gray-400': expenseStatus === '완료',
                        'border-red-100 text-red-400': expenseStatus === '실패',
                    })}
                >
                    <p>{`${expenseStatus}된 지출액이 없어요.`}</p>
                </div>
            )}
        </>
    );
};
