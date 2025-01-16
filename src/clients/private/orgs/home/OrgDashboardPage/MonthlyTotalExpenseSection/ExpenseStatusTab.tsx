import React, {memo} from 'react';
import cn from 'classnames';
import {currencyFormat, unitFormat} from '^utils/number';
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

    const totalPrice = subscriptions
        // TODO: 대시보드 / 이달의 지출인데, 구독의 최종 결제금액을 기준으로 계산하는것은 위험하다.
        .map(({currentBillingAmount}) => currentBillingAmount?.toDisplayPrice(displayCurrency) || 0)
        .reduce((a, b) => a + b, 0);

    return (
        <div
            onClick={() => onClick(status, subscriptions)}
            className={cn('flex items-center gap-4 pb-3 cursor-pointer border-b-2', {
                'font-semibold': isActive,
                'border-transparent': !isActive,
                [activeBorderColorClass]: isActive,
            })}
        >
            <div
                className={`flex items-center justify-center px-3 py-1 rounded-lg ${activeBgColorClass} ${activeTextColorClass}`}
            >
                {t_billingHistoryStatusForDashboard(status)}
            </div>
            <div>
                합계: {currencyFormat(totalPrice)} ({unitFormat(subscriptions.length, '건')})
            </div>
        </div>
    );
});
ExpenseStatusTab.displayName = 'ExpenseStatusTab';
