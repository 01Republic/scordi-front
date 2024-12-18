import React, {memo} from 'react';

interface BillingHistoryMonthlyHeaderProps {
    months: number[];
}

export const BillingHistoryMonthlyHeader = memo((props: BillingHistoryMonthlyHeaderProps) => {
    const {months} = props;

    return (
        <tr className="bg-slate-100">
            <th className={'sticky left-0 !bg-slate-100 flex z-10 border-r-2'}>서비스명</th>
            <th>상태</th>
            <th className={'text-right'}>지출 비중</th>
            <th className={'text-right'}>총 지출액</th>
            <th className={'text-right'}>평균지출액</th>
            {months.map((month) => (
                <th key={month} className={'text-right'}>
                    {month}월
                </th>
            ))}
        </tr>
    );
});
BillingHistoryMonthlyHeader.displayName = 'BillingHistoryMonthlyHeader';
