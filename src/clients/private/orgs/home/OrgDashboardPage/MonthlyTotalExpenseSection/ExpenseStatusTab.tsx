import React, {memo} from 'react';
import cn from 'classnames';
import {currencyFormat} from '^utils/number';
import {BillingHistoryStatus, t_billingHistoryStatusForDashboard} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';

interface ExpenseStatusTabProps {
    status: BillingHistoryStatus;
    currentStatus: BillingHistoryStatus;
    onClick: (tab: BillingHistoryStatus, subscriptions: SubscriptionDto[]) => any;
    subscriptions: SubscriptionDto[];
    activeBorderColorClass: string;
    activeTextColorClass: string;
    activeBgColorClass: string;
}

export const ExpenseStatusTab = memo((props: ExpenseStatusTabProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {status, currentStatus, onClick, subscriptions} = props;
    const {activeTextColorClass, activeBorderColorClass, activeBgColorClass} = props;

    const isActive = currentStatus === status;

    const totalPrice = subscriptions.reduce(
        (total, subscription) => total + (subscription.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0),
        0,
    );

    return (
        <button
            onClick={() => onClick(status, subscriptions)}
            className={cn('flex-1 flex items-center gap-[2px] pb-3 border-b-2', {
                [activeBorderColorClass]: isActive,
                'border-transparent': !isActive,
            })}
        >
            <div
                className={`flex items-center justify-center px-3 py-1 rounded-lg ${activeBgColorClass} ${activeTextColorClass}`}
            >
                {t_billingHistoryStatusForDashboard(status)}
            </div>
            <span>{`${currencyFormat(totalPrice)} (${subscriptions.length.toLocaleString()}건)`}</span>
        </button>
    );
});
ExpenseStatusTab.displayName = 'ExpenseStatusTab';
