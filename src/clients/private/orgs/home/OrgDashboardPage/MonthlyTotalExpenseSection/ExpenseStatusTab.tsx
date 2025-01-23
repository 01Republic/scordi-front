import React, {memo} from 'react';
import cn from 'classnames';
import {currencyFormat, roundNumber, unitFormat} from '^utils/number';
import {BillingHistoryStatus, t_billingHistoryStatusForDashboard} from '^models/BillingHistory/type';
import {SummaryOfState} from '^types/dashboard.type';
import {toast} from 'react-hot-toast';

interface ExpenseStatusTabProps {
    status: BillingHistoryStatus;
    currentStatus: BillingHistoryStatus;
    onClick: (tab: BillingHistoryStatus, summaryData: SummaryOfState) => any;
    summaryData?: SummaryOfState;
    activeBorderColorClass: string;
    activeTextColorClass: string;
    activeBgColorClass: string;
}

export const ExpenseStatusTab = memo((props: ExpenseStatusTabProps) => {
    const {status, currentStatus, onClick, summaryData} = props;
    const {activeTextColorClass, activeBorderColorClass, activeBgColorClass} = props;

    const isActive = currentStatus === status;

    const activeThisTab = () => {
        summaryData ? onClick(status, summaryData) : console.log('데이터가 아직 로드 되지 않았습니다.');
    };

    return (
        <div
            onClick={activeThisTab}
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
                합계: {currencyFormat(roundNumber(summaryData?.amount || 0))} (
                {unitFormat(summaryData?.count || 0, '건')})
            </div>
        </div>
    );
});
ExpenseStatusTab.displayName = 'ExpenseStatusTab';
