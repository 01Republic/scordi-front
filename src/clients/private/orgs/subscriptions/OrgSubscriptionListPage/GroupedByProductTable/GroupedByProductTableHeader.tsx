import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';
import {visibleColumnsState} from '../atom';
import {allColumnIds, ColumnId} from '../tableColums';

interface Props {
    sortVal: 'ASC' | 'DESC';
    orderBy: (sortKey: string) => void;
}

export const GroupedByProductTableHeader = memo((props: Props) => {
    const {orderBy, sortVal} = props;

    const visible = useRecoilValue(visibleColumnsState);
    const visibleSet = new Set(visible);

    const header: Record<ColumnId, React.ReactNode> = {
        checkBox: <th />,
        subscriptionName: (
            <SortableTH2 sortKey="[nameEn]" sortVal={sortVal} onClick={orderBy} colSpan={2} className="min-w-60">
                서비스 명
            </SortableTH2>
        ),
        team: <th>팀</th>,
        // isFreeTier:"유/무료",
        status: <th>상태</th>,
        billingCycle: <th>결제주기</th>,
        // "payingType",
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
            <SortableTH
                sortKey="[subscriptions][lastPaidAt]"
                sortVal={sortVal}
                onClick={orderBy}
                className="text-right"
            >
                최근결제일
            </SortableTH>
        ),
        memberCount: <th>사용인원</th>,
        payMethod: (
            <SortableTH2 sortKey="[subscriptions][creditCard][name]" sortVal={sortVal} onClick={orderBy}>
                결제수단
            </SortableTH2>
        ),
        master: (
            <SortableTH sortKey="[masterId]" sortVal={sortVal} onClick={orderBy}>
                담당자
            </SortableTH>
        ),
        note: <th>비고</th>,
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
