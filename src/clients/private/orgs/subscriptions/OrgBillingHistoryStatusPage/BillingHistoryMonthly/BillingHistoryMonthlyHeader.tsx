import React, {memo} from 'react';
import {WideMode} from '../../OrgBillingHistoryStatusPage';
import {useTranslation} from 'next-i18next';

interface BillingHistoryMonthlyHeaderProps {
    focusYear: number;
    months: number[];
    wideMode?: WideMode;
    stickyPos?: number;
}

export const BillingHistoryMonthlyHeader = memo((props: BillingHistoryMonthlyHeaderProps) => {
    const {t} = useTranslation('subscription');
    const {focusYear, months, wideMode = WideMode.Narrow, stickyPos = 0} = props;

    const isHidden = wideMode === WideMode.WideHideColumn;

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                <th className={'sticky left-0 !bg-slate-100 flex z-10 border-r-2'}>
                    {t('billingHistory.table.header.serviceName') as string}
                </th>
                <th className={isHidden ? 'hidden' : ''} />
                <th className={isHidden ? 'hidden' : 'text-center'}>
                    {t('billingHistory.table.header.status') as string} &nbsp;
                </th>
                <th className={isHidden ? 'hidden' : 'text-right'}>
                    {t('billingHistory.table.header.expenseRatio') as string}
                </th>
                <th className={'text-right'}>{t('billingHistory.table.header.totalExpense') as string}</th>
                <th className={'text-right'}>{t('billingHistory.table.header.averageExpense') as string}</th>
                {months.map((month) => (
                    <th key={month} className={'text-right'}>
                        {t('billingHistory.table.monthFormat', {year: focusYear.toString().slice(-2), month}) as string}
                    </th>
                ))}
            </tr>
        </thead>
    );
});
BillingHistoryMonthlyHeader.displayName = 'BillingHistoryMonthlyHeader';
