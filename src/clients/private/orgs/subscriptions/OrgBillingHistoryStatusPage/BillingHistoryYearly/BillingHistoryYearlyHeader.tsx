import React, {memo} from 'react';
import {PinOff} from 'lucide-react';

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
        () => <div className="">서비스명</div>,
        () => <div className="">결제수단</div>,
        () => <div className="w-full text-right">유/무료</div>,
        () => <div className="w-full text-right">평균지출액</div>,
    ];

    const FixedColumns = Columns.slice(0, stickyPos);
    const ScrollColumns = Columns.slice(stickyPos);

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                {stickyPos > 0 && (
                    <th colSpan={stickyPos} className="!bg-slate-100 p-0">
                        <div className={`w-full grid grid-cols-${stickyPos} min-w-max border-r-2`}>
                            {FixedColumns.map((Column, i) => (
                                <div key={i} className="p-4 text-start min-w-fit group relative cursor-default">
                                    <Column />
                                    {setStickyPos && (
                                        <div className="absolute top-0 bottom-0 -right-1 flex items-center justify-center">
                                            <div
                                                className="my-auto p-1 cursor-pointer hidden group-hover:block text-gray-400 hover:text-black transition-all"
                                                onClick={() => setStickyPos(i)}
                                            >
                                                <PinOff />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </th>
                )}

                {ScrollColumns.map((Column, i) => (
                    <th key={i} className="group relative cursor-default">
                        <Column />
                        {setStickyPos && (
                            <div className="absolute top-0 bottom-0 -right-1 flex items-center justify-center">
                                <div
                                    className="my-auto p-1 cursor-pointer hidden group-hover:block text-gray-400 hover:text-black transition-all"
                                    onClick={() => setStickyPos(stickyPos + i + 1)}
                                >
                                    <PinOff />
                                </div>
                            </div>
                        )}
                    </th>
                ))}

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
