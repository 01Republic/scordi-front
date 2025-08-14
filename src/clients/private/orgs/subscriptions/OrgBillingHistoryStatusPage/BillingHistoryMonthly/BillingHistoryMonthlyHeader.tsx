import React, {memo} from 'react';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {WideMode} from '../../OrgBillingHistoryStatusPage';
import {FixedHeader} from '../fixed/FixedHeader';
import {FixableHeader} from '../fixed/FixableHeader';

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
        () => <div className="peer w-48">서비스명</div>,
        () => <div className="peer w-48">결제수단</div>,
        ...(isHidden
            ? []
            : [
                  () => <div className="peer w-28 text-center">상태 &nbsp;</div>,
                  () => <div className="w-28 text-right">지출 비중</div>,
              ]),
        () => <div className="peer w-28 text-right">총 지출액</div>,
        () => <div className="peer w-28 text-right">평균지출액</div>,
    ];

    return (
        <thead className="[--rounded-box:0.375rem]">
            <tr className="bg-slate-100">
                {stickyPos > 0 && <FixedHeader Columns={Columns.slice(0, stickyPos)} setPos={setStickyPos} />}
                {setStickyPos && (
                    <FixableHeader Columns={Columns.slice(stickyPos)} setPos={(i) => setStickyPos(stickyPos + i + 1)} />
                )}
                {months.map((month) => (
                    <th key={month} className="text-right">
                        {format(new Date(focusYear, month - 1, 1), 'yy년 M월', {locale: ko})}
                    </th>
                ))}
            </tr>
        </thead>
    );
});
BillingHistoryMonthlyHeader.displayName = 'BillingHistoryMonthlyHeader';
