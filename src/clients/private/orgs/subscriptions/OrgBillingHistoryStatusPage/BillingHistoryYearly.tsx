import React, {memo} from 'react';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';
import {FaQuestion} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {CardContainerTableLayout} from '^clients/private/_components/table/ListTable';

interface BillingHistoryYearlyProps {
    history: BillingHistoriesYearlySumBySubscriptionDto[];
}

export const BillingHistoryYearly = memo((props: BillingHistoryYearlyProps) => {
    const {history} = props;
    const {years} = useBillingHistoryStatus();
    const reversedYears = [...years].reverse();

    const getAverageCost = (yearly: BillingHistoriesYearlySumBySubscriptionDto) => {
        const total = yearly.items.reduce((sum, item) => sum + item.amount, 0);
        return total / yearly.items.length;
    };

    const renderYearlyColumns = (items: BillingHistoriesYearlySumBySubscriptionDto['items'], years: number[]) => {
        return years.map((year, idx) => {
            const currentYearData = items.find((item) => item.issuedYear === year);
            const previousYearData = items.find((item) => item.issuedYear === years[idx - 1]);

            let colorClass = '';
            if (currentYearData && previousYearData) {
                colorClass =
                    currentYearData.amount > previousYearData.amount
                        ? 'text-red-500 bg-red-50'
                        : currentYearData.amount < previousYearData.amount
                        ? 'text-blue-500 bg-blue-50'
                        : '';
            }

            return (
                <td key={idx} className={`text-right ${colorClass}`}>
                    {currentYearData ? `${currentYearData.symbol} ${currentYearData.amount.toLocaleString()}` : 'N/A'}
                </td>
            );
        });
    };

    return (
        <CardContainerTableLayout>
            <div className="bg-white border border-gray-300 overflow-hidden shadow rounded-lg">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full text-sm">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="sticky left-0 !bg-slate-100 z-10">서비스명</th>
                                <th className="text-right">유/무료</th>
                                <th className="text-right">평균지출액</th>
                                {reversedYears.map((year) => (
                                    <th key={year} className="text-right">
                                        {year}년
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan={reversedYears.length + 3} className="text-center py-8">
                                        <EmptyTable message="데이터가 없습니다." />
                                    </td>
                                </tr>
                            ) : (
                                history.map((item, idx) => (
                                    <tr key={idx} className="group">
                                        <td className="sticky left-0 bg-white z-10 flex space-x-2 font-medium">
                                            <Avatar
                                                className="w-6 h-6"
                                                src={item.subscription.product.image}
                                                alt={item.subscription.product.name()}
                                                draggable={false}
                                                loading="lazy"
                                            >
                                                <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                                            </Avatar>
                                            <span>{item.subscription.product.name()}</span>
                                        </td>
                                        <td className="text-right">
                                            <IsFreeTierTagUI value={item.subscription.isFreeTier} />
                                        </td>
                                        <td className="text-right font-medium">
                                            {item.subscription.currentBillingAmount?.symbol}{' '}
                                            {getAverageCost(item).toLocaleString()}
                                        </td>
                                        {renderYearlyColumns(item.items, reversedYears)}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </CardContainerTableLayout>
    );
});
