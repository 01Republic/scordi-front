import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {BillingHistoryStatusMetaDto} from '^models/BillingHistory/type';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTableContainer} from '^clients/private/_components/table/ListTable';
import {MonthYearSwitch} from './MonthYearSwitch';
import {YearlyScopeHandler} from './YearlyScopeHandler';
import {rangeToArr} from '^utils/range';

export const OrgBillingHistoryStatusPage = memo(function OrgBillingHistoryStatusPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const [metaData, setMetaData] = useState<BillingHistoryStatusMetaDto>();
    const [viewUnit, setViewUnit] = useState(BillingCycleOptions.Monthly);
    const [years, setYears] = useState<number[]>([]);
    const [focusYear, setFocusYear] = useState<number>();

    const getMetaData = debounce(() => {
        billingHistoryApi.statusMeta(orgId).then((res) => {
            setMetaData(res.data);
            const years = res.data.years.reverse();
            setYears(years);
            setFocusYear(years[0]);
        });
    }, 500);

    const onReady = () => {
        getMetaData();
    };

    const onSearch = (keyword?: string) => {
        // const query = plainToInstance(FindAllBillingHistoriesQueryDto, {
        //     startDate: 'hi',
        // });
        // console.log(query);
        // const q2 = new FindAllBillingHistoriesQueryDto();
    };

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
                if (!metaData) return <div />;

                if (viewUnit === BillingCycleOptions.Yearly) return <div />;
                if (!focusYear) return <div />;

                return (
                    <YearlyScopeHandler years={metaData.years.reverse()} value={focusYear} onChange={setFocusYear} />
                );
            }}
            onSearch={onSearch}
        >
            <ListTableContainer
                hideTopPaginator
                pagination={{
                    totalItemCount: 163,
                    currentItemCount: 10,
                    totalPage: 17,
                    currentPage: 1,
                    itemsPerPage: 10,
                }}
            ></ListTableContainer>
        </ListPage>
    );
});
