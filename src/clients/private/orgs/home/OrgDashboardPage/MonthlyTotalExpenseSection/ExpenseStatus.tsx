import React, {Dispatch, SetStateAction} from 'react';
import cn from 'classnames';
import {SubscriptionDto} from '^models/Subscription/types';
import {ExpenseStatusType} from '^clients/private/orgs/home/OrgDashboardPage/MonthlyTotalExpenseSection/index';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {currencyFormat} from '^utils/number';
import {SubscriptionManager} from '^models/Subscription/manager';

interface ExpenseStatusProps {
    subscriptions: SubscriptionDto[];
    expenseStatus: ExpenseStatusType;
    setExpenseStatus: Dispatch<SetStateAction<ExpenseStatusType>>;
}

export const ExpenseStatus = (props: ExpenseStatusProps) => {
    const {subscriptions, expenseStatus, setExpenseStatus} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const getPendingSubscriptions = SubscriptionManager.init(subscriptions).pending().list;
    const getPendingSubscriptionTotalPrice = getPendingSubscriptions.reduce(
        (total, current) => total + (current.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0),
        0,
    );

    const getCompletedList = [
        ...SubscriptionManager.init(subscriptions).success().list,
        ...SubscriptionManager.init(subscriptions).free().list,
        ...SubscriptionManager.init(subscriptions).none().list,
    ];
    const getCompletedListTotalPrice = getCompletedList.reduce(
        (total, current) => total + (current.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0),
        0,
    );

    const getFailedList = SubscriptionManager.init(subscriptions).failed().list;
    const getFailedListTotalPrice = getFailedList.reduce(
        (total, current) => total + (current.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0),
        0,
    );

    return (
        <div className="w-full flex gap-5">
            <button
                onClick={() => setExpenseStatus('예정')}
                className={cn('flex-1 flex items-center gap-[2px] pb-3 border-b-2', {
                    'border-orange-400': expenseStatus === '예정',
                    'border-transparent': expenseStatus !== '예정',
                })}
            >
                <div className="flex items-center justify-center px-3 py-1 rounded-lg bg-orange-100 text-orange-400">
                    예정
                </div>
                <span>{`${currencyFormat(getPendingSubscriptionTotalPrice)} (${
                    getPendingSubscriptions.length
                }건)`}</span>
            </button>
            <button
                onClick={() => setExpenseStatus('완료')}
                className={cn('flex-1 flex items-center gap-[2px] pb-3 border-b-2', {
                    'border-gray-400': expenseStatus === '완료',
                    'border-transparent': expenseStatus !== '완료',
                })}
            >
                <div className="flex items-center justify-center px-3 py-1 rounded-lg bg-gray-100 text-gray-400">
                    완료
                </div>
                <span>{`${currencyFormat(getCompletedListTotalPrice)} (${getCompletedList.length}건)`}</span>
            </button>
            <button
                onClick={() => setExpenseStatus('실패')}
                className={cn('flex-1 flex items-center gap-[2px] pb-3 border-b-2', {
                    'border-red-400': expenseStatus === '실패',
                    'border-transparent': expenseStatus !== '실패',
                })}
            >
                <div className="flex items-center justify-center px-3 py-1 rounded-lg bg-red-100 text-red-400">
                    실패
                </div>
                <span>{`${currencyFormat(getFailedListTotalPrice)} (${getFailedList.length}건)`}</span>
            </button>
        </div>
    );
};
