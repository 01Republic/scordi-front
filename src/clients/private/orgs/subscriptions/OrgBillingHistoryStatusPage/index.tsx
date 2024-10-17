import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {BillingHistoriesYearlySumBySubscriptionDto, BillingHistoryDto} from '^models/BillingHistory/type';
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
    const [billingItems, setBillingItems] = useState<BillingHistoryDto[]>([]);
    const [filteredItems, setFilteredItems] = useState<BillingHistoryDto[]>([]);
    const [yearlyHistory, setYearlyHistory] = useState<BillingHistoriesYearlySumBySubscriptionDto[]>([]);
    const [filteredYearlyHistory, setFilteredYearlyHistory] = useState<BillingHistoriesYearlySumBySubscriptionDto[]>(
        [],
    );

    useEffect(() => {
        if (viewUnit === BillingCycleOptions.Yearly) setFocusYear(undefined);
    }, [viewUnit]);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        const startDate = `${focusYear || years[years.length - 1]}-01-01`;
        const endDate = `${focusYear || years[0]}-12-31`;

        const fetchBillingData = async () => {
            const [monthlyResponse, yearlyResponse] = await Promise.all([
                billingHistoryApi.indexOfOrg(orgId, {startDate, endDate, itemsPerPage: 0}),
                billingHistoryApi.statusApi.yearlySum(orgId),
            ]);

            setBillingItems(monthlyResponse.data.items);
            setFilteredItems(monthlyResponse.data.items);
            setYearlyHistory(yearlyResponse.data);
            setFilteredYearlyHistory(yearlyResponse.data);
        };

        fetchBillingData();
    }, [focusYear, orgId, years]);

    const handleSearch = (keyword = '') => {
        const filterByName = (item: BillingHistoryDto | BillingHistoriesYearlySumBySubscriptionDto) =>
            item.subscription?.product.name().includes(keyword);

        setFilteredItems(billingItems.filter(filterByName));
        setFilteredYearlyHistory(yearlyHistory.filter(filterByName));
    };

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
                <BillingHistoryMonthly billingHistory={filteredItems} />
            ) : (
                <BillingHistoryYearly history={filteredYearlyHistory} />
            )}
        </ListPage>
    );
});
