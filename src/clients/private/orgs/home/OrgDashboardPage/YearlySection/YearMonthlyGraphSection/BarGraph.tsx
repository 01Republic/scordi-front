import React, {memo, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {useSetRecoilState} from 'recoil';
import {selectedMonthAtom} from '^models/_dashboard/atom';
import {DashboardSummaryYearMonthlyItemDto, DashboardSummaryYearMonthlyResultDto} from '^models/_dashboard/type';
import {CustomTooltip} from './CustomTooltip';
import {roundNumber} from '^utils/number';
import {rangeToArr} from '^utils/range';

interface BarGraphProps {
    result?: DashboardSummaryYearMonthlyResultDto;
    changeMonthlyItem?: (monthlyItem?: DashboardSummaryYearMonthlyItemDto) => any;
}

export const BarGraph = memo((props: BarGraphProps) => {
    const {result, changeMonthlyItem} = props;
    const items = result?.items || [];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const setSelectedMonth = useSetRecoilState(selectedMonthAtom);

    const formattedData = items.map((item) => {
        const monthLabel = `${item.month}월`;
        const monthlyTotalAmount = item.amount;
        const paidAmount = item.paidData?.amount;
        const notPaidAmount = item.notPaidData?.amount;
        const paidDataServiceCount = item.paidData?.serviceCount;
        const notPaidServiceCount = item.notPaidData?.serviceCount;

        return {
            month: monthLabel,
            monthlyTotalAmount,
            paidAmount,
            notPaidAmount,
            paidDataServiceCount,
            notPaidServiceCount,
        };
    });

    const maxAmount = Math.max(...items.map(({amount}) => amount));
    const ticks = rangeToArr(0, 10).map((i) => (maxAmount / 10) * i);

    return (
        <div className="w-full h-[580px] max-h-[580px] p-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={formattedData}
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
                            const month = parseInt(`${clickedData.month}`.replace(/\D/g, ''));
                            const monthlyItem = items.find((item) => item.month === month);
                            changeMonthlyItem && changeMonthlyItem(monthlyItem);
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
                        width={110}
                        domain={[0, 'monthlyTotalAmount']}
                        ticks={ticks}
                        axisLine={false}
                        tickCount={10}
                        tickFormatter={(value) => `${roundNumber(value / 10000).toLocaleString()}만원`}
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
                        stackId="a"
                        dataKey="getPaidAmount"
                        barSize={8}
                        fill="#5C5FEE"
                        isAnimationActive={false}
                        shape={(props: any) => {
                            const {x, y, width, height, index} = props;
                            const isBarHovered = hoveredIndex === null || hoveredIndex === index;
                            const fill = isBarHovered ? '#5C5FEE' : '#EFEFFD';
                            return <rect x={x} y={y} width={width} height={height} fill={fill} rx={2} />;
                        }}
                    />
                    <Bar
                        stackId="a"
                        dataKey="getExpectedAmount"
                        barSize={8}
                        fill="#FBCFE8"
                        isAnimationActive={false}
                        shape={(props: any) => {
                            const {x, y, width, height, index} = props;
                            const isBarHovered = hoveredIndex === null || hoveredIndex === index;
                            const fill = isBarHovered ? '#FBCFE8' : '#FEF1F8';
                            return <rect x={x} y={y} width={width} height={height} fill={fill} rx={2} />;
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});
