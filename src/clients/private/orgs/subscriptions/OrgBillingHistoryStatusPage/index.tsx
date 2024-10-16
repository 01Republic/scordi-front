import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {MonthYearSwitch} from './MonthYearSwitch';
import {YearlyScopeHandler} from './YearlyScopeHandler';
import {BillingHistoryMonthly} from './BillingHistoryMonthly';
import {BillingHistoryYearly} from './BillingHistoryYearly';
import {Paginated} from '^types/utils/paginated.dto';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';

export const OrgBillingHistoryStatusPage = memo(function OrgBillingHistoryStatusPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {dateRange, years, focusYear, setFocusYear, getMetaData} = useBillingHistoryStatus();

    const [viewUnit, setViewUnit] = useState(BillingCycleOptions.Monthly);

    const [billingItems, setBillingItems] = useState<Paginated<BillingHistoryDto>>();

    const onReady = () => {
        getMetaData();
    };

    const onSearch = (keyword?: string) => {
        getBillingItems(keyword);
    };

    const getBillingItems = (keyword?: string) => {
        if (!orgId || isNaN(orgId)) return;
        billingHistoryApi
            .indexOfOrg(orgId, {
                startDate: `${focusYear || years[years.length - 1]}-01-01`,
                endDate: `${focusYear || years[0]}-12-31`,
                itemsPerPage: 0,
            })
            .then((res) => {
                const filterdItems = res.data.items.filter((item) =>
                    item.subscription?.product.name().includes(keyword || ''),
                );
                setBillingItems({items: filterdItems, pagination: res.data.pagination});
            });
    };

    useEffect(() => {
        getBillingItems();
    }, [focusYear]);

    useEffect(() => {
        if (viewUnit === BillingCycleOptions.Yearly) {
            setFocusYear(undefined);
        }
    }, [viewUnit]);

    return (
        <ListPage
            onReady={onReady}
            breadcrumb={['구독', {text: '결제현황', active: true}]}
            titleText="결제현황"
            Buttons={() => (
                <MonthYearSwitch
                    defaultValue={viewUnit}
                    onChange={(value) => {
                        setViewUnit(value);
                        if (value === BillingCycleOptions.Yearly) setFocusYear(undefined);
                        if (value === BillingCycleOptions.Monthly) setFocusYear(years[0]);
                    }}
                />
            )}
            searchInputPosition="right-of-scopes"
            searchInputPlaceholder="서비스명 검색"
            ScopeHandler={() => {
                if (!dateRange) return <div />;

                if (viewUnit === BillingCycleOptions.Yearly) return <div />;
                if (!focusYear) return <div />;

                return <YearlyScopeHandler years={years} value={focusYear} onChange={setFocusYear} />;
            }}
            onSearch={onSearch}
        >
            {!!billingItems && viewUnit === BillingCycleOptions.Monthly && (
                <BillingHistoryMonthly billingHistory={billingItems} />
            )}
            {!!billingItems && viewUnit === BillingCycleOptions.Yearly && (
                <BillingHistoryYearly billingHistory={billingItems} />
            )}
        </ListPage>
    );
});
