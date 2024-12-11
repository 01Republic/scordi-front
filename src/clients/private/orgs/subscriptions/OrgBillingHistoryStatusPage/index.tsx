import React, {memo, useEffect, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {
    BillingHistoriesMonthlySumBySubscriptionDto,
    BillingHistoriesYearlySumBySubscriptionDto,
} from '^models/BillingHistory/type';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {MonthYearSwitch} from './MonthYearSwitch';
import {YearlyScopeHandler} from './YearlyScopeHandler';
import {BillingHistoryMonthly} from './BillingHistoryMonthly';
import {BillingHistoryYearly} from './BillingHistoryYearly';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';

export const OrgBillingHistoryStatusPage = memo(function OrgBillingHistoryStatusPage() {
    const monthlyRef = useRef<{downloadExcel: () => any}>(null);
    const yearlyRef = useRef<{downloadExcel: () => any}>(null);
    const orgId = useRecoilValue(orgIdParamState);
    const {years, focusYear, setFocusYear, getMetaData} = useBillingHistoryStatus();

    const [viewUnit, setViewUnit] = useState(BillingCycleOptions.Monthly);
    const [isLoading, setIsLoading] = useState(false);

    // Monthly States
    const [monthlyHistories, setMonthlyHistories] = useState<BillingHistoriesMonthlySumBySubscriptionDto[]>([]);
    const [filteredMonthlyHistories, setFilteredMonthlyHistories] = useState<
        BillingHistoriesMonthlySumBySubscriptionDto[]
    >([]);

    // Yearly States
    // const [yearlyHistories, setYearlyHistories] = useState<BillingHistoriesYearlySumBySubscriptionDto[]>([]);
    // const [filteredYearlyHistories, setFilteredYearlyHistories] = useState<
    //     BillingHistoriesYearlySumBySubscriptionDto[]
    // >([]);

    const fetchBillingData = async () => {
        setIsLoading(true);
        try {
            if (focusYear) {
                const monthlyResponse = await billingHistoryApi.statusApi.monthlySum(orgId, focusYear);

                setMonthlyHistories(monthlyResponse.data);
                setFilteredMonthlyHistories(monthlyResponse.data);
            } else {
                // const yearlyResponse = await billingHistoryApi.statusApi.yearlySum(orgId);
                //
                // setYearlyHistories(yearlyResponse.data);
                // setFilteredYearlyHistories(yearlyResponse.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (keyword = '') => {
        const filterByName = (
            item: BillingHistoriesMonthlySumBySubscriptionDto | BillingHistoriesYearlySumBySubscriptionDto,
        ) => item.subscription?.product.name().includes(keyword);

        setFilteredMonthlyHistories(monthlyHistories.filter(filterByName));
        // setFilteredYearlyHistories(yearlyHistories.filter(filterByName));
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
            scopeWrapperClass="!items-start"
            searchInputPlaceholder="서비스명 검색"
            ScopeHandler={() =>
                viewUnit === BillingCycleOptions.Monthly ? (
                    focusYear && <YearlyScopeHandler years={years} value={focusYear} onChange={setFocusYear} />
                ) : (
                    <div />
                )
            }
            onSearch={handleSearch}
            onDownload={() => {
                const ref = viewUnit === BillingCycleOptions.Monthly ? monthlyRef : yearlyRef;
                ref.current?.downloadExcel();
            }}
        >
            {viewUnit === BillingCycleOptions.Monthly ? (
                <BillingHistoryMonthly ref={monthlyRef} history={filteredMonthlyHistories} />
            ) : (
                <BillingHistoryYearly ref={yearlyRef} />
                // <div>sibal</div>
            )}
        </ListPage>
    );
});
