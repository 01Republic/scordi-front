import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';

interface BillingHistoryYearlyHeaderProps {
    years: number[];
}

export const BillingHistoryYearlyHeader = memo((props: BillingHistoryYearlyHeaderProps) => {
    const {t} = useTranslation('subscription');
    const {years} = props;

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                <th className="sticky left-0 !bg-slate-100 z-10 w-[10%]">
                    {t('billingHistory.table.header.serviceName') as string}
                </th>
                <th className="text-right">{t('billingHistory.table.header.freePaid') as string}</th>
                <th className="text-right">{t('billingHistory.table.header.averageExpense') as string}</th>
                {years.map((year) => (
                    <th key={year} className="text-right">
                        {t('billingHistory.table.yearFormat', {year}) as string}
                    </th>
                ))}
            </tr>
        </thead>
    );
});
BillingHistoryYearlyHeader.displayName = 'BillingHistoryYearlyHeader';
