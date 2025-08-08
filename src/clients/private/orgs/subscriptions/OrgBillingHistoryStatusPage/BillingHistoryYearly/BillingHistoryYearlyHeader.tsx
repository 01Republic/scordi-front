import React, {memo} from 'react';

interface BillingHistoryYearlyHeaderProps {
    years: number[];
    minYearLen?: number;
}

export const BillingHistoryYearlyHeader = memo((props: BillingHistoryYearlyHeaderProps) => {
    const {years, minYearLen = 5} = props;
    const emptyYearLen = minYearLen - years.length;
    const lastYear = years[years.length - 1] || new Date().getFullYear();

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                <th colSpan={2} className="!bg-slate-100 p-0">
                    <div className="w-full grid grid-cols-2 min-w-max border-r-2">
                        <div className="p-4 text-start min-w-max">서비스명</div>
                        <div className="p-4 text-start min-w-max">결제수단</div>
                    </div>
                </th>
                <th className="text-right">유/무료</th>
                <th className="text-right">평균지출액</th>
                {years.map((year) => (
                    <th key={year} className="text-right">
                        {year}년
                    </th>
                ))}
                {Array.from({length: emptyYearLen}).map((_, i) => (
                    <th key={i} className="min-w-[120px] text-right text-gray-500/50">
                        {lastYear + i + 1}년
                    </th>
                ))}
            </tr>
        </thead>
    );
});
BillingHistoryYearlyHeader.displayName = 'BillingHistoryYearlyHeader';
