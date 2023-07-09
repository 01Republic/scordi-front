import {memo, useEffect, useState} from 'react';
import {InvoiceTabItem} from './InvoiceTabItem';
import {atom, useRecoilValue} from 'recoil';
import {ContentTabNav} from '^layouts/ContentLayout';
import {useDashboardSummaryV3} from '^hooks/useDashboardSummary';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';

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
            case 0:
                // params.where.isSuccess = undefined;
                search(params);
                break;
            case 2:
                // params.where.isSuccess = true;
                search(params);
                break;
            case 3:
                // params.where.isSuccess = false;
                search(params);
                break;
            default:
                break;
        }
        setBeforeTabIndex(tabIndex);
    }, [tabIndex]);

    const tabs = [
        {label: <InvoiceTabItem name="전체내역" count={counts.total} />},
        {label: <InvoiceTabItem name="결제대기" count={counts.pending} />},
        {label: <InvoiceTabItem name="결제완료" count={counts.complete} />},
        {label: <InvoiceTabItem name="결제실패" count={counts.failure} />},
    ];

    return <ContentTabNav resetIndex={true} tabs={tabs.map((tab) => tab.label)} recoilState={navTabIndex} />;
});
