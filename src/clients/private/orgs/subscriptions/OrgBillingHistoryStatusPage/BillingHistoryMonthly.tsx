import React, {memo} from 'react';
import {ListTableContainer} from '^clients/private/_components/table/ListTable';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {Paginated} from '^types/utils/paginated.dto';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';

interface BillingHistoryMonthlyProps {
    billingHistory: Paginated<BillingHistoryDto>;
}

export const BillingHistoryMonthly = memo((props: BillingHistoryMonthlyProps) => {
    const {items, pagination} = props.billingHistory;
    const {subscription, costSymbol, monthlyCosts, totalCost, averageCost} = useBillingHistoryStatus();

    const grouped = items.reduce((acc, item) => {
        const key = item.subscription!.product.id;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<string, BillingHistoryDto[]>);

    return (
        <ListTableContainer
            hideTopPaginator={true}
            hideBottomPaginator={true}
            pagination={pagination}
            movePage={() => {}}
        >
            <div className="card bg-white border overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full text-sm">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className={'sticky left-0 !bg-slate-100 z-10'}>서비스명</th>
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
                                        <td className={'sticky left-0 bg-white z-10 flex space-x-2 font-medium'}>
                                            {!!subscription(items)?.product.image ? (
                                                <img
                                                    className={'rounded'}
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </ListTableContainer>
    );
});
