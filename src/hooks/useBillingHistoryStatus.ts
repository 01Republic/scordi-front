import {useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BillingHistoryDto, BillingHistoryStatusMetaDto} from '^models/BillingHistory/type';

export const useBillingHistoryStatus = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [metaData, setMetaData] = useState<BillingHistoryStatusMetaDto>();
    const [years, setYears] = useState<number[]>([]);
    const [focusYear, setFocusYear] = useState<number>();

    const getMetaData = debounce(() => {
        !!orgId &&
            billingHistoryApi.statusMeta(orgId).then((res) => {
                setMetaData(res.data);
                const years = res.data.years.reverse();
                setYears(years);
                setFocusYear(years[0]);
            });
    }, 500);

    const subscription = (items: BillingHistoryDto[]) => items[0].subscription;

    const costSymbol = (items: BillingHistoryDto[]) => {
        return subscription(items)?.currentBillingAmount?.symbol || '₩';
    };

    const totalCost = (items: BillingHistoryDto[]) => {
        return items.reduce((acc, value) => acc + (value.subscription?.currentBillingAmount?.amount || 0), 0);
    };

    const averageCost = (items: number[], symbol?: string) => {
        const filteredItems = items.filter((value) => value !== 0);
        const average =
            filteredItems.length > 0 ? filteredItems.reduce((acc, value) => acc + value, 0) / filteredItems.length : 0;

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

    useEffect(() => {
        getMetaData();
    }, []);

    return {
        metaData,
        years,
        focusYear,
        setFocusYear,
        getMetaData,
        subscription,
        costSymbol,
        totalCost,
        averageCost,
        monthlyCosts,
        yearlyCost,
    };
};
