import React, {Dispatch, memo, SetStateAction, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {BillingHistoriesMonthlySumItemDto} from '^models/BillingHistory/type';
import {currencyFormat} from '^utils/number';
import {useSetRecoilState} from 'recoil';
import {selectedMonthAtom} from '^models/_dashboard/atom';

interface BarGraphProps {
    monthsPayLog: {month: string; items: BillingHistoriesMonthlySumItemDto[] | undefined}[];
}

export const BarGraph = memo((props: BarGraphProps) => {
    const {monthsPayLog} = props;
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const setSelectedMonth = useSetRecoilState(selectedMonthAtom);

    const formattedPaidExpenseData = monthsPayLog.map((entry, index) => {
        const monthlyTotalAmount = entry.items ? entry.items.reduce((sum, item) => sum + item.amount, 0) : 0;
        const roundUpMonthlyTotalToTenThousand = Math.ceil(monthlyTotalAmount / 10000) * 10000;
        const floorMonthlyTotalAmount = Math.floor(monthlyTotalAmount);
        const monthLabel = `${entry.month.split('-')[1]}월`;
        const itemLength = entry.items?.length;

        return {
            index,
            month: monthLabel,
            monthlyTotalAmount,
            roundUpMonthlyTotalToTenThousand,
            floorMonthlyTotalAmount,
            itemLength,
        };
    });

    const getMonthlyRoundupTotalAmounts = formattedPaidExpenseData.map(
        (paidExpenseData) => paidExpenseData.roundUpMonthlyTotalToTenThousand,
    );
    const getMonthMaxTotalAmounts = Math.max.apply(null, getMonthlyRoundupTotalAmounts) || 1000000;

    return (
        <div className="w-full h-[580px] max-h-[580px] p-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={formattedPaidExpenseData}
                    margin={{
                        top: 20,
                        bottom: 20,
                    }}
                    onMouseMove={(state) => {
                        if (state.isTooltipActive) {
                            setHoveredIndex(state.activeTooltipIndex ?? null);
                        } else {
                            setHoveredIndex(null);
                        }
                    }}
                    onMouseLeave={() => {
                        setHoveredIndex(null);
                    }}
                    onClick={(state) => {
                        if (state && state.activePayload && state.activePayload.length > 0) {
                            const clickedData = state.activePayload[0].payload;
                            setSelectedMonth(clickedData.month);
                        }
                    }}
                >
                    <CartesianGrid stroke="#D6D6D6" vertical={false} horizontal={true} />
                    <XAxis
                        width={50}
                        dataKey="month"
                        axisLine={{
                            stroke: '#D6D6D6',
                        }}
                        tickLine={false}
                        tick={{
                            fontWeight: 300,
                            fontSize: 14,
                            fill: '#7D7C78',
                        }}
                        tickMargin={18}
                    />
                    <YAxis
                        width={100}
                        domain={[0, getMonthMaxTotalAmounts]}
                        axisLine={false}
                        tickCount={11}
                        tickFormatter={(value) => `${value / 10000}만원`}
                        tickLine={false}
                        tick={{
                            fontWeight: 300,
                            fontSize: 14,
                            fill: '#7D7C78',
                        }}
                        tickMargin={40}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                    <Bar
                        dataKey="monthlyTotalAmount"
                        barSize={8}
                        fill="#5C5FEE"
                        shape={(props: any) => {
                            const {x, y, width, height, index} = props;
                            const isBarHovered = hoveredIndex === null || hoveredIndex === index;
                            const fill = isBarHovered ? '#5C5FEE' : '#EFEFFD';
                            return <rect x={x} y={y} width={width} height={height} fill={fill} rx={2} />;
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
}

export const CustomTooltip = memo((props: CustomTooltipProps) => {
    const {active, payload} = props;
    if (active && payload && payload.length > 0) {
        const currentData = payload[0].payload;

        return (
            <div className="flex-flex-col justify-start gap-1 py-2 px-3 bg-zinc-900 text-white font-medium text-12 rounded-lg">
                <p>{`구독 지출액: ${currencyFormat(currentData.floorMonthlyTotalAmount)}`}</p>
                <p>{`구독 건수: ${currentData.itemLength}건`}</p>
            </div>
        );
    }

    return null;
});
