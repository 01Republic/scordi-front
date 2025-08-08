import React, {memo} from 'react';
import {WideMode} from '../../OrgBillingHistoryStatusPage';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useElementWidth} from '^hooks/useElementWidth';
import {Pin, PinOff} from 'lucide-react';

interface BillingHistoryMonthlyHeaderProps {
    focusYear: number;
    months: number[];
    wideMode?: WideMode;
    stickyPos?: number;
    setStickyPos?: (pos: number) => any;
}

export const BillingHistoryMonthlyHeader = memo((props: BillingHistoryMonthlyHeaderProps) => {
    const {focusYear, months, wideMode = WideMode.Narrow, stickyPos = 0, setStickyPos} = props;
    const isHidden = wideMode === WideMode.WideHideColumn;

    const Columns = [
        () => <div className="">서비스명</div>,
        () => <div className="">결제수단</div>,
        ...(isHidden
            ? []
            : [
                  () => <div className="w-full text-center">상태 &nbsp;</div>,
                  () => <div className="w-full text-right">지출 비중</div>,
              ]),
        () => <div className="w-full text-right">총 지출액</div>,
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
                                    <Pin />
                                </div>
                            </div>
                        )}
                    </th>
                ))}
                {months.map((month) => (
                    <th key={month} className={'text-right'}>
                        {format(new Date(focusYear, month - 1, 1), 'yy년 M월', {locale: ko})}
                    </th>
                ))}
            </tr>
        </thead>
    );
});
BillingHistoryMonthlyHeader.displayName = 'BillingHistoryMonthlyHeader';
