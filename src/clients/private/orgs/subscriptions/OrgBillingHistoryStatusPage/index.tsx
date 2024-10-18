import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {
    BillingHistoriesMonthlySumBySubscriptionDto,
    BillingHistoriesYearlySumBySubscriptionDto,
    BillingHistoryDto,
} from '^models/BillingHistory/type';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {MonthYearSwitch} from './MonthYearSwitch';
import {YearlyScopeHandler} from './YearlyScopeHandler';
import {BillingHistoryMonthly} from './BillingHistoryMonthly';
import {BillingHistoryYearly} from './BillingHistoryYearly';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';

export const OrgBillingHistoryStatusPage = memo(function OrgBillingHistoryStatusPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {years, focusYear, setFocusYear, getMetaData} = useBillingHistoryStatus();

    const [viewUnit, setViewUnit] = useState(BillingCycleOptions.Monthly);
    const [monthlyHistory, setMonthlyHistory] = useState<BillingHistoriesMonthlySumBySubscriptionDto[]>([]);
    const [filteredMonthlyHistory, setFilteredMonthlyHistory] = useState<BillingHistoriesMonthlySumBySubscriptionDto[]>(
        [],
    );
    const [yearlyHistory, setYearlyHistory] = useState<BillingHistoriesYearlySumBySubscriptionDto[]>([]);
    const [filteredYearlyHistory, setFilteredYearlyHistory] = useState<BillingHistoriesYearlySumBySubscriptionDto[]>(
        [],
    );

    const fetchBillingData = async () => {
        if (focusYear) {
            const monthlyResponse = await billingHistoryApi.statusApi.monthlySum(orgId, focusYear);

            setMonthlyHistory(monthlyResponse.data);
            setFilteredMonthlyHistory(monthlyResponse.data);
        } else {
            const yearlyResponse = await billingHistoryApi.statusApi.yearlySum(orgId);

            setYearlyHistory(yearlyResponse.data);
            setFilteredYearlyHistory(yearlyResponse.data);
        }
    };

    const handleSearch = (keyword = '') => {
        const filterByName = (
            item: BillingHistoriesMonthlySumBySubscriptionDto | BillingHistoriesYearlySumBySubscriptionDto,
        ) => item.subscription?.product.name().includes(keyword);

        setFilteredMonthlyHistory(monthlyHistory.filter(filterByName));
        setFilteredYearlyHistory(yearlyHistory.filter(filterByName));
    };

    useEffect(() => {
        if (viewUnit === BillingCycleOptions.Yearly) setFocusYear(undefined);
    }, [viewUnit]);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        fetchBillingData();
    }, [focusYear, orgId, years]);

    return (
        <ListPage
            onReady={getMetaData}
            breadcrumb={['구독', {text: '결제현황', active: true}]}
            titleText="결제현황"
            Buttons={() => (
                <MonthYearSwitch
                    defaultValue={viewUnit}
                    onChange={(value) => {
                        setViewUnit(value);
                        setFocusYear(value === BillingCycleOptions.Monthly ? years[0] : undefined);
                    }}
                />
            )}
            searchInputPosition="right-of-scopes"
            searchInputPlaceholder="서비스명 검색"
            ScopeHandler={() =>
                viewUnit === BillingCycleOptions.Monthly ? (
                    focusYear && <YearlyScopeHandler years={years} value={focusYear} onChange={setFocusYear} />
                ) : (
                    <div />
                )
            }
            onSearch={handleSearch}
        >
            {viewUnit === BillingCycleOptions.Monthly ? (
                <BillingHistoryMonthly history={filteredMonthlyHistory} />
            ) : (
                <BillingHistoryYearly history={filteredYearlyHistory} />
            )}
        </ListPage>
    );
});
