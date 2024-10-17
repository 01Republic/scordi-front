import React, {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';
import {FaQuestion} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';

interface BillingHistoryMonthlyProps {
    billingHistory: BillingHistoryDto[];
}

export const BillingHistoryMonthly = memo((props: BillingHistoryMonthlyProps) => {
    const {billingHistory} = props;
    const {subscription, costSymbol, monthlyCosts, totalCost, averageCost} = useBillingHistoryStatus();

    const grouped = billingHistory.reduce((acc, item) => {
        const key = item.subscription!.product.id;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<string, BillingHistoryDto[]>);

    return (
        <div className="bg-white border border-gray-300 overflow-hidden shadow rounded-2xl">
            <div className="overflow-x-auto w-full">
                <table className="table w-full text-sm">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className={'sticky left-0 !bg-slate-100 z-10'}>서비스명</th>
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
                        {Object.entries(grouped).length === 0 ? (
                            <tr>
                                <td colSpan={16} className="text-center py-8">
                                    데이터가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            Object.entries(grouped).map(([key, items]) => {
                                return (
                                    <tr key={key} className={'group'}>
                                        <td className={'sticky left-0 bg-white z-10 flex space-x-2 font-medium w-52'}>
                                            <Avatar
                                                className="w-6 h-6"
                                                src={subscription(items)?.product.image}
                                                alt={subscription(items)?.product.name()}
                                                draggable={false}
                                                loading="lazy"
                                            >
                                                <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                                            </Avatar>
                                            <span>{subscription(items)?.product.name()}</span>
                                        </td>
                                        <td>
                                            <IsFreeTierTagUI value={subscription(items)?.isFreeTier || false} />
                                        </td>
                                        <td className={'text-right font-medium'}>
                                            {costSymbol(items)} {totalCost(items).toLocaleString()}
                                        </td>
                                        <td className={'text-right font-medium'}>
                                            {costSymbol(items)}{' '}
                                            {averageCost(monthlyCosts(items), costSymbol(items)).toLocaleString()}
                                        </td>
                                        {monthlyCosts(items).map((item, index) => {
                                            const previousItem = index > 0 ? monthlyCosts(items)[index - 1] : item;
                                            const isHigher = item > previousItem;
                                            const isLower = item < previousItem;

                                            return (
                                                <td
                                                    key={index}
                                                    className={`text-right font-light ${
                                                        isHigher
                                                            ? 'text-red-500 bg-red-50'
                                                            : isLower
                                                            ? 'text-blue-500 bg-blue-50'
                                                            : ''
                                                    }`}
                                                >
                                                    {costSymbol(items)} {item.toLocaleString()}
                                                </td>
                                            );
                                        })}
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
