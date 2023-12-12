import {memo, useEffect, useState} from 'react';
import {InvoiceTabItem} from './InvoiceTabItem';
import {atom, useRecoilValue} from 'recoil';
import {ContentTabNav} from '^layouts/ContentLayout';
import {useDashboardSummaryV3} from '^hooks/useDashboardSummary';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {StatusQueryOptions} from '^models/BillingHistory/type';

export const navTabIndex = atom({
    key: 'v3/InvoiceTabNavIndex',
    default: 0,
});

type InvoiceCountByKind = {
    total: number;
    pending: number;
    complete: number;
    failure: number;
};

export const InvoiceTabNav = memo(() => {
    const tabIndex = useRecoilValue(navTabIndex);
    const [beforeTabIndex, setBeforeTabIndex] = useState(NaN);
    const {query, search} = useBillingHistoriesV3();
    const {data: summary} = useDashboardSummaryV3();
    const [counts, setCounts] = useState<InvoiceCountByKind>({
        total: 0,
        pending: 0,
        complete: 0,
        failure: 0,
    });

    useEffect(() => {
        if (!summary) return;
        const {total, pending, success, failure} = summary;
        setCounts({
            total: total.count,
            pending: pending.count,
            complete: success.count,
            failure: failure.count,
        });
    }, [summary]);

    useEffect(() => {
        if (isNaN(beforeTabIndex)) {
            setBeforeTabIndex(tabIndex);
            return;
        }
        if (tabIndex === beforeTabIndex) return;

        const params = {...query, where: {...query.where}};
        switch (tabIndex) {
            // 전체 내역
            case 0:
                params.status = undefined;
                search(params);
                break;
            // 결제 대기
            case 1:
                params.status = StatusQueryOptions.Pending;
                search(params);
                break;
            // 결제 완료
            case 2:
                params.status = StatusQueryOptions.Success;
                search(params);
                break;
            // 결제 실패
            case 3:
                params.status = StatusQueryOptions.Failed;
                search(params);
                break;
            default:
                break;
        }
        setBeforeTabIndex(tabIndex);
    }, [tabIndex]);

    const tabs = [
        {label: <InvoiceTabItem name="전체 내역" count={counts.total} />},
        {label: <InvoiceTabItem name="결제 대기" count={counts.pending} />},
        {label: <InvoiceTabItem name="결제 완료" count={counts.complete} />},
        {label: <InvoiceTabItem name="결제 실패" count={counts.failure} />},
    ];

    return <ContentTabNav resetIndex={true} tabs={tabs.map((tab) => tab.label)} recoilState={navTabIndex} />;
});
