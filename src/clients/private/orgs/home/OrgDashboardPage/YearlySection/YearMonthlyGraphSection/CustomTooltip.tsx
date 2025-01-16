import React, {memo} from 'react';
import {currencyFormat, roundNumber} from '^utils/number';

interface PayloadDataType {
    month: string;
    paidAmount: number;
    notPaidAmount: number;
    paidDataServiceCount: number;
    notPaidServiceCount: number;
}

interface ChartData {
    chartType?: string;
    color: string;
    dataKey: string;
    fill: string;
    formatter?: Function;
    hide: boolean;
    name: string;
    payload: PayloadDataType;
    type?: string;
    unit?: string;
    value: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: ChartData[];
}

export const CustomTooltip = memo((props: CustomTooltipProps) => {
    const {active, payload} = props;

    if (active && payload && payload.length > 0) {
        const currentData = payload[0].payload;

        return (
            <div className="flex-flex-col justify-start gap-1 py-2 px-3 bg-zinc-900 text-neutral-50 font-medium text-12 rounded-lg">
                {currentData.notPaidAmount && (
                    <>
                        <p>{`구독 지출액 예정액: ${currencyFormat(roundNumber(currentData.notPaidAmount))}`}</p>
                        <p>{`구독 예정 건수: ${currentData.notPaidServiceCount.toLocaleString()}건`}</p>
                        <div className="w-full my-2 border-[0.5px] border-neutral-600" />
                    </>
                )}

                <p>{`구독 지출액: ${currencyFormat(roundNumber(currentData.paidAmount || 0))}`}</p>
                <p>{`구독 건수: ${currentData.paidDataServiceCount?.toLocaleString() || 0}건`}</p>
            </div>
        );
    }

    return null;
});
