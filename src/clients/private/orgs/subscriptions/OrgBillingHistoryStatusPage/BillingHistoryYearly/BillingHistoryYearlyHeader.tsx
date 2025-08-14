import React, {memo} from 'react';
import {FixedHeader} from '../fixed/FixedHeader';
import {FixableHeader} from '../fixed/FixableHeader';

interface BillingHistoryYearlyHeaderProps {
    years: number[];
    minYearLen?: number;
    stickyPos?: number;
    setStickyPos?: (pos: number) => any;
}

export const BillingHistoryYearlyHeader = memo((props: BillingHistoryYearlyHeaderProps) => {
    const {years, minYearLen = 5, stickyPos = 0, setStickyPos} = props;
    const emptyYearLen = minYearLen - years.length;
    const lastYear = years[years.length - 1] || new Date().getFullYear();

    const Columns = [
        () => <div className="peer w-48">서비스명</div>,
        () => <div className="peer w-48">결제수단</div>,
        () => <div className="peer w-28 text-center">유/무료</div>,
        () => <div className="peer w-28 text-right">평균지출액</div>,
    ];

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                {stickyPos > 0 && <FixedHeader Columns={Columns.slice(0, stickyPos)} setPos={setStickyPos} />}
                {setStickyPos && (
                    <FixableHeader Columns={Columns.slice(stickyPos)} setPos={(i) => setStickyPos(stickyPos + i + 1)} />
                )}

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
