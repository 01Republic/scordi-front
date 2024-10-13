import React, {memo, useEffect} from 'react';
import {ListTableContainer} from '^clients/private/_components/table/ListTable';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {Paginated} from '^types/utils/paginated.dto';
import {object} from 'prop-types';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {Table} from '^v3/share/table/Table';

interface BillingHistoryMonthlyProps {
    items: Paginated<BillingHistoryDto>;
}

export const BillingHistoryMonthly = memo((props: BillingHistoryMonthlyProps) => {
    const {items, pagination} = props.items;

    const grouped = items.reduce((acc, item) => {
        const key = item.subscription!.product.id;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<string, BillingHistoryDto[]>);

    const subscription = (items: BillingHistoryDto[]) => items[0].subscription;

    const costSymbol = (items: BillingHistoryDto[]) => {
        return subscription(items)?.currentBillingAmount?.symbol;
    };

    const totalCost = (items: BillingHistoryDto[]) => {
        return items.reduce((acc, value) => acc + (value.subscription?.currentBillingAmount?.amount || 0), 0);
    };

    const averageCost = (items: number[], symbol?: string) => {
        const filteredItems = items.filter((value) => value !== 0);
        const average = filteredItems.reduce((acc, value) => acc + value, 0) / filteredItems.length;
        if (symbol === '₩') {
            return Math.round(average);
        } else {
            return parseFloat(average.toFixed(2));
        }
    };

    const monthlyCosts = (items: BillingHistoryDto[]) => {
        const list: number[] = Array(12).fill(0);
        items.map((item) => {
            const month = item.issuedAt.getMonth(); // 해당 월 (0 = 1월, 11 = 12월)
            const amount = item.subscription?.currentBillingAmount?.amount || 0;
            list[month] += amount; // 해당 월에 금액을 더함
        });
        return list;
    };

    return (
        <ListTableContainer hideTopPaginator pagination={pagination} movePage={() => {}}>
            <div className="card bg-white border overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full text-sm">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className={'!relative'}>서비스명</th>
                                <th className={'text-right'}>구독상태</th>
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
                            {Object.entries(grouped).map(([key, items]) => {
                                return (
                                    <tr key={key} className={'group'}>
                                        <td className={'flex space-x-2 font-medium'}>
                                            {!!subscription(items)?.product.image ? (
                                                <img
                                                    src={subscription(items)?.product.image}
                                                    alt={subscription(items)?.product.name()}
                                                    width={24}
                                                />
                                            ) : (
                                                <div className={'w-6'} />
                                            )}
                                            <span>{subscription(items)?.product.name()}</span>
                                        </td>
                                        <td>
                                            {subscription(items)?.isFreeTier ? (
                                                <IsFreeTierTagUI value={subscription(items)?.isFreeTier || true} />
                                            ) : (
                                                <BillingCycleTypeTagUI
                                                    value={
                                                        subscription(items)?.billingCycleType ||
                                                        BillingCycleOptions.None
                                                    }
                                                    short
                                                />
                                            )}
                                        </td>
                                        <td className={'text-right font-medium'}>
                                            {costSymbol(items)} {totalCost(items).toLocaleString()}
                                        </td>
                                        <td className={'text-right font-medium'}>
                                            {costSymbol(items)}{' '}
                                            {averageCost(monthlyCosts(items), costSymbol(items)).toLocaleString()}
                                        </td>
                                        {monthlyCosts(items).map((item, index) => {
                                            const previousItem = index > 0 ? monthlyCosts(items)[index - 1] : item; // 이전 항목과 현재 항목 비교
                                            const isHigher = item !== 0 && item > previousItem;
                                            const isLower = item !== 0 && item < previousItem;

                                            return (
                                                <td
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </ListTableContainer>
    );
});
