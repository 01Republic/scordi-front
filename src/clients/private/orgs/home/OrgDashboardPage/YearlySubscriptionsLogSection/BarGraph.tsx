import React, {Dispatch, PureComponent, SetStateAction, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {BillingHistoriesMonthlySumItemDto} from '^models/BillingHistory/type';
import {ExpenseStatusType} from '^clients/private/orgs/home/OrgDashboardPage/MonthlyTotalExpenseSection';
import {currencyFormat} from '^utils/number';

interface BarGraphProps {
    monthsData: {month: string; items: BillingHistoriesMonthlySumItemDto[] | undefined}[];
}

export const BarGraph = (props: BarGraphProps) => {
    const {monthsData} = props;
    const [hoveredIndex, setHoveredIndex] = useState<boolean | null>(null);

    const formattedPaidExpenseData = monthsData.map((entry) => {
        const monthlyTotalAmount = entry.items ? entry.items.reduce((sum, item) => sum + item.amount, 0) : 0;
        const roundUpMonthlyTotalToTenThousand = Math.ceil(monthlyTotalAmount / 10000) * 10000;
        const floorMonthlyTotalAmount = Math.floor(monthlyTotalAmount);
        const monthLabel = `${entry.month.split('-')[1]}월`;
        const itemLength = entry.items?.length;

        return {
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
    const getMonthMaxTotalAmounts = Math.max.apply(null, getMonthlyRoundupTotalAmounts);

    return (
        <div className="w-full h-[580px] max-h-[580px] p-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={formattedPaidExpenseData}
                    margin={{
                        top: 20,
                        bottom: 20,
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
                    <Tooltip
                        content={<CustomTooltip setHoveredIndex={setHoveredIndex} />}
                        cursor={{fill: 'transparent'}}
                    />
                    <Bar
                        dataKey="monthlyTotalAmount"
                        barSize={8}
                        fill="#5C5FEE"
                        shape={(props: any) => {
                            const {x, y, width, height, index} = props;
                            const fill = hoveredIndex === null || hoveredIndex ? '#5C5FEE' : '#EFEFFD';
                            return <rect x={x} y={y} width={width} height={height} fill={fill} rx={2} />;
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    setHoveredIndex: (index: boolean | null) => void;
}

export const CustomTooltip = (props: CustomTooltipProps) => {
    const {active, payload, setHoveredIndex} = props;
    if (active && payload && payload.length > 0) {
        const currentData = payload[0].payload;

        setHoveredIndex(active);

        return (
            <div className="flex-flex-col justify-start gap-1 py-2 px-3 bg-zinc-900 text-white font-medium text-12 rounded-lg">
                <p>{`구독 지출액: ${currencyFormat(currentData.floorMonthlyTotalAmount)}`}</p>
                <p>{`구독 건수: ${currentData.itemLength}건`}</p>
            </div>
        );
    }
    setHoveredIndex(null);
    return null;
};
