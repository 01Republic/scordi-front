import React, {memo} from 'react';
import {ListTableContainer} from '^clients/private/_components/table/ListTable';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {useBillingHistoryStatus} from '^clients/private/orgs/subscriptions/OrgBillingHistoryStatusPage/useBillingHistoryStatus';

interface BillingHistoryYearlyProps {
    billingHistory: Paginated<BillingHistoryDto>;
}

export const BillingHistoryYearly = memo((props: BillingHistoryYearlyProps) => {
    const {items, pagination} = props.billingHistory;
    const {years} = useBillingHistoryStatus();

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

    const averageCost = (items: number[], symbol?: string) => {
        const filteredItems = items.filter((value) => value !== 0);
        const average = filteredItems.reduce((acc, value) => acc + value, 0) / filteredItems.length;
        if (symbol === '₩') {
            return Math.round(average);
        } else {
            return parseFloat(average.toFixed(2));
        }
    };

    const yearlyCost = (items: BillingHistoryDto[]) => {
        const yearCostMap: {[key: string]: number} = {};
        items.forEach((item) => {
            const year = item.issuedAt.getFullYear().toString();
            const amount = item.subscription?.currentBillingAmount?.amount || 0;
            if (!yearCostMap[year]) {
                yearCostMap[year] = 0;
            }
            yearCostMap[year] += amount;
        });
        return yearCostMap;
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
                                <th className={'text-right'}>평균지출액</th>
                                {years.map((year) => (
                                    <th key={year} className={'text-right'}>
                                        {year}년
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(grouped).map(([key, items]) => {
                                const costMap = yearlyCost(items);
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
                                        <td className="text-right">
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
                                        <td className="text-right font-medium">
                                            {costSymbol(items)}{' '}
                                            {averageCost(Object.values(costMap), costSymbol(items)).toLocaleString()}
                                        </td>
                                        {years.map((year) => (
                                            <td key={year} className="text-right">
                                                {costSymbol(items)} {(costMap[year] || 0).toLocaleString()}
                                            </td>
                                        ))}
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
