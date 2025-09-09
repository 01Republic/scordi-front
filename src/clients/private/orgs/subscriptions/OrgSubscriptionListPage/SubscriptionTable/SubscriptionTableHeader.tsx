import {memo, ReactNode} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';
import {useRecoilValue} from 'recoil';
import {visibleColumnsState} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/atom';
import {allColumnIds, ColumnId} from '../TableColumnsHandler/tableColumns';
import React from 'react';

interface SubscriptionTableHeaderProps {
    sortVal: 'ASC' | 'DESC';
    orderBy: (sortKey: string) => void;
}

export const SubscriptionTableHeader = memo((props: SubscriptionTableHeaderProps) => {
    const {sortVal, orderBy} = props;
    const visible = useRecoilValue(visibleColumnsState);
    const visibleSet = new Set(visible);

    const header: Record<ColumnId, React.ReactNode> = {
        checkBox: <th />,
        subscriptionName: (
            <SortableTH2 sortKey="[product][nameEn]" onClick={orderBy} sortVal={sortVal}>
                서비스 명
            </SortableTH2>
        ),
        team: <th>팀</th>,
        status: <th>상태</th>,
        billingCycle: <th>결제주기</th>,
        amount: (
            <SortableTH
                // sortKey="[currentBillingAmount][dollarPrice]"
                sortVal="DESC"
                className="flex items-center justify-end"
            >
                결제금액
            </SortableTH>
        ),
        lastPaidAt: (
            <SortableTH sortKey="[lastPaidAt]" sortVal={sortVal} onClick={orderBy} className="text-right">
                최근결제일
            </SortableTH>
        ),
        memberCount: <th>사용인원</th>,
        payMethod: (
            <SortableTH2 sortKey="[creditCard][name]" sortVal={sortVal} onClick={orderBy}>
                결제수단
            </SortableTH2>
        ),
        master: (
            <SortableTH sortKey="[masterId]" sortVal={sortVal} onClick={orderBy}>
                담당자
            </SortableTH>
        ),
        note: <SortableTH>비고</SortableTH>,
        actions: <th />,
    };

    return (
        <tr className="bg-slate-100">
            {allColumnIds
                .filter((id) => visibleSet.has(id))
                .map((id) => (
                    <React.Fragment key={id}>{header[id]}</React.Fragment>
                ))}
        </tr>
    );
});
SubscriptionTableHeader.displayName = 'SubscriptionTableHeader';
