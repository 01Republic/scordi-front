import React, {memo} from 'react';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {FaQuestion} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';

interface BillingHistoryMonthlyProps {
    history: BillingHistoriesMonthlySumBySubscriptionDto[];
}

export const BillingHistoryMonthly = memo((props: BillingHistoryMonthlyProps) => {
    const {history} = props;

    const getAverageCost = (monthly: BillingHistoriesMonthlySumBySubscriptionDto) => {
        return getMonthlyCosts(monthly) / monthly.items.length;
    };

    const getMonthlyCosts = (monthly: BillingHistoriesMonthlySumBySubscriptionDto) => {
        const total = monthly.items.reduce((sum, item) => sum + item.amount, 0);
        return total;
    };

    const renderMonthlyColumns = (items: BillingHistoriesMonthlySumBySubscriptionDto['items']) => {
        return Array.from({length: 12}, (_, i) => i).map((idx) => {
            const item = items[idx] ?? {amount: 0, symbol: items[0].symbol};
            const previousItem = idx > 0 ? items[idx - 1] : item;
            const amount = item?.amount ?? 0;
            const previousAmount = previousItem?.amount ?? 0;
            const isHigher = amount > previousAmount;
            const isLower = amount < previousAmount;

            return (
                <td
                    key={idx}
                    className={`text-right font-light ${
                        isHigher ? 'text-red-500 bg-red-50' : isLower ? 'text-blue-500 bg-blue-50' : ''
                    }`}
                >
                    {item.symbol} {amount.toLocaleString()}
                </td>
            );
        });
    };

    return (
        <div className="bg-white border border-gray-300 overflow-hidden shadow rounded-2xl">
            <div className="overflow-x-auto w-full hide-scrollbar">
                <table className="table w-full text-sm">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className={'sticky left-0 !bg-slate-100 flex z-10 border-r-2'}>서비스명</th>
                            <th className={'text-right'}>유/무료</th>
                            <th className={'text-right'}>총 지출액</th>
                            <th className={'text-right'}>평균지출액</th>
                            {Array.from({length: 12}, (_, i) => (
                                <th key={i} className={'text-right'}>
                                    {i + 1}월
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan={16} className="text-center py-8">
                                    <EmptyTable message="데이터가 없습니다." />
                                </td>
                            </tr>
                        ) : (
                            history.map((monthly, idx) => {
                                return (
                                    <tr key={idx} className={'group'}>
                                        <td
                                            className={
                                                'sticky left-0 bg-white z-10 flex space-x-2 font-medium w-52 border-r-2 shadow-lg'
                                            }
                                        >
                                            <Avatar
                                                className="w-6 h-6"
                                                src={monthly.subscription.product.image}
                                                alt={monthly.subscription.product.name()}
                                                draggable={false}
                                                loading="lazy"
                                            >
                                                <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                                            </Avatar>
                                            <span>{monthly.subscription.product.name()}</span>
                                        </td>
                                        <td>
                                            <IsFreeTierTagUI value={monthly.subscription.isFreeTier || false} />
                                        </td>
                                        <td className={'text-right font-medium'}>
                                            {monthly.subscription.currentBillingAmount?.symbol}{' '}
                                            {getMonthlyCosts(monthly).toLocaleString()}
                                        </td>
                                        <td className={'text-right font-medium'}>
                                            {monthly.subscription.currentBillingAmount?.symbol}{' '}
                                            {getAverageCost(monthly).toLocaleString()}
                                        </td>
                                        {renderMonthlyColumns(monthly.items)}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
