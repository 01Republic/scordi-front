import React, {Dispatch, memo, SetStateAction, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {BillingHistoriesMonthlySumItemDto} from '^models/BillingHistory/type';
import {currencyFormat, roundNumber} from '^utils/number';
import {useSetRecoilState} from 'recoil';
import {selectedMonthAtom} from '^models/_dashboard/atom';
import {DashboardSummaryYearMonthlyResultDto} from '^models/_dashboard/type';
import {CustomTooltip} from '^clients/private/orgs/home/OrgDashboardPage/YearlySection/YearlySubscriptionsLogSection/CustomTooltip';
import item from '^v3/share/sections/MobileSection/Item';
import {CustomBar} from '^clients/private/orgs/home/OrgDashboardPage/YearlySection/YearlySubscriptionsLogSection/CustomBar';

interface BarGraphProps {
    monthsHistoriesLog: {month: string; items: BillingHistoriesMonthlySumItemDto[] | undefined}[];
    monthlyBillingSchedule: DashboardSummaryYearMonthlyResultDto | undefined;
}

export const BarGraph = memo((props: BarGraphProps) => {
    const {monthlyBillingSchedule} = props;
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const setSelectedMonth = useSetRecoilState(selectedMonthAtom);

    const formattedData = monthlyBillingSchedule?.items.map((item) => {
        const monthLabel = `${item.month}월`;
        const monthlyTotalAmount = item.amount;
        const roundUpMonthlyTotalToTenThousand = Math.ceil(item.amount / 10000) * 10000;
        const getPaidAmount = item.paidData?.amount;
        const getExpectedAmount = item.notPaidData.amount;
        const getPaidLength = item.paidData?.serviceCount;
        const getExpectedLength = item.notPaidData?.serviceCount;

        return {
            month: monthLabel,
            monthlyTotalAmount,
            roundUpMonthlyTotalToTenThousand,
            getPaidAmount,
            getExpectedAmount,
            getPaidLength,
            getExpectedLength,
        };
    });

    const getMaxRoundedMonthlyTotal = () => {
        if (!formattedData || formattedData.length === 0) return 0;
        return Math.max(...formattedData.map((item) => item.roundUpMonthlyTotalToTenThousand));
    };
    const maxAmount = getMaxRoundedMonthlyTotal();
    const ticks = Array.from({length: 11}, (_, i) => (maxAmount / 10) * i);

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
                        width={110}
                        domain={[0, 'monthlyTotalAmount']}
                        ticks={ticks}
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
