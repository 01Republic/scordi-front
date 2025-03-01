import React, {memo} from 'react';

interface BillingHistoryYearlyHeaderProps {
    years: number[];
}

export const BillingHistoryYearlyHeader = memo((props: BillingHistoryYearlyHeaderProps) => {
    const {years} = props;

    return (
        <tr className="bg-slate-100">
            <th className="sticky left-0 !bg-slate-100 z-10">서비스명</th>
            <th className="text-right">유/무료</th>
            <th className="text-right">평균지출액</th>
            {years.map((year) => (
                <th key={year} className="text-right">
                    {year}년
                </th>
            ))}
        </tr>
    );
});
BillingHistoryYearlyHeader.displayName = 'BillingHistoryYearlyHeader';
