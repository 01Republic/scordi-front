import React, {memo} from 'react';
import {WideMode} from '../../OrgBillingHistoryStatusPage';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useElementWidth} from '^hooks/useElementWidth';

interface BillingHistoryMonthlyHeaderProps {
    focusYear: number;
    months: number[];
    wideMode?: WideMode;
    stickyPos?: number;
}

export const BillingHistoryMonthlyHeader = memo((props: BillingHistoryMonthlyHeaderProps) => {
    const {focusYear, months, wideMode = WideMode.Narrow, stickyPos = 0} = props;
    const isHidden = wideMode === WideMode.WideHideColumn;

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                <th colSpan={2} className="!bg-slate-100 p-0">
                    <div className="w-full grid grid-cols-2 min-w-max border-r-2">
                        <div className="p-4 text-start min-w-max">서비스명</div>
                        <div className="p-4 text-start min-w-max">결제수단</div>
                    </div>
                </th>
                <th className={isHidden ? 'hidden' : 'text-center'}>상태 &nbsp;</th>
                <th className={isHidden ? 'hidden' : 'text-right'}>지출 비중</th>
                <th className={'text-right'}>총 지출액</th>
                <th className={'text-right'}>평균지출액</th>
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
