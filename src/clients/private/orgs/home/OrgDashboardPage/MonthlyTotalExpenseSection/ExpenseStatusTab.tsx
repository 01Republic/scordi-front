import {BillingHistoryStatus, t_billingHistoryStatusForDashboard} from '^models/BillingHistory/type';
import {SummaryOfState} from '^types/dashboard.type';
import {currencyFormatWithI18n, roundNumber} from '^utils/number';
import cn from 'classnames';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface ExpenseStatusTabProps {
    status: BillingHistoryStatus;
    currentStatus: BillingHistoryStatus;
    onClick: (tab: BillingHistoryStatus, summaryData: SummaryOfState) => any;
    summaryData?: SummaryOfState;
    activeBorderColorClass: string;
    hoverBorderColorClass: string;
    activeTextColorClass: string;
    activeBgColorClass: string;
}

export const ExpenseStatusTab = memo((props: ExpenseStatusTabProps) => {
    const {status, currentStatus, onClick, summaryData} = props;
    const {t} = useTranslation('dashboard');
    const {t: tCommon} = useTranslation('common');
    const {activeTextColorClass, activeBorderColorClass, hoverBorderColorClass, activeBgColorClass} = props;

    const isActive = currentStatus === status;

    const activeThisTab = () => {
        summaryData ? onClick(status, summaryData) : console.log(t('toast.dataNotLoaded'));
    };

    return (
        <div
            onClick={activeThisTab}
            className={cn(
                'flex justify-between md:justify-start md:items-center md:gap-3 lg:gap-4 pb-3 cursor-pointer border-b-2',
                hoverBorderColorClass,
                {
                    'font-semibold': isActive,
                    'border-transparent': !isActive,
                    [activeBorderColorClass]: isActive,
                },
            )}
        >
            <div
                className={`flex items-center justify-center px-3 py-1 rounded-lg ${activeBgColorClass} ${activeTextColorClass}`}
            >
                {t_billingHistoryStatusForDashboard(status, t)}
            </div>
            <div>
                {t('expenseStatus.total', {
                    amount: currencyFormatWithI18n(roundNumber(summaryData?.amount || 0), tCommon),
                    count: summaryData?.count || 0,
                })}
            </div>
        </div>
    );
});
ExpenseStatusTab.displayName = 'ExpenseStatusTab';
