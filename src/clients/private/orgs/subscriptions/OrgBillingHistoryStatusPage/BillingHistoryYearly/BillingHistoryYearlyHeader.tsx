import React, {memo} from 'react';

interface BillingHistoryYearlyHeaderProps {
    years: number[];
}

export const BillingHistoryYearlyHeader = memo((props: BillingHistoryYearlyHeaderProps) => {
    const {years} = props;

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                <th
                    colSpan={2}
                    className="sticky flex left-0 !bg-slate-100 z-20 border-r-2 p-0 whitespace-nowrap colspan"
                >
                    <div className="!col-span-1 border-r-2 p-4 text-start min-w-60">서비스명</div>
                    <div className="!col-span-1 p-4 text-start min-w-60">결제수단</div>
                </th>
                <th className="text-right">유/무료</th>
                <th className="text-right">평균지출액</th>
                {years.map((year) => (
                    <th key={year} className="text-right">
                        {year}년
                    </th>
                ))}
            </tr>
        </thead>
    );
});
BillingHistoryYearlyHeader.displayName = 'BillingHistoryYearlyHeader';
