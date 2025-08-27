import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';

interface BankAccountTableHeaderProps extends ListTableHeaderProps {
    sortVal: 'ASC' | 'DESC';
}

export const BankAccountTableHeader = memo((props: BankAccountTableHeaderProps) => {
    const {orderBy, sortVal} = props;

    return (
        <tr className="bg-slate-100">
            {/* 은행 프로필 */}
            <SortableTH sortKey="[name]" onClick={orderBy}>
                이름
            </SortableTH>

            {/* 상태 (editable, sortable) */}
            <SortableTH sortKey="[usingStatus]" onClick={orderBy}>
                상태
            </SortableTH>

            {/* 구독 수 */}
            <SortableTH2 sortKey="[subscriptionCount]" onClick={orderBy} sortVal={sortVal}>
                구독 수
            </SortableTH2>

            {/* 월 누적 결제금액 */}
            <SortableTH2 sortKey="[monthlyPaidAmount]" onClick={orderBy} sortVal={sortVal}>
                월 누적 결제금액
            </SortableTH2>

            {/* 은행명 */}
            <th>은행명</th>

            {/* 구분(법인/개인) */}
            <th>구분</th>

            {/* 연결된 카드 */}
            <th>연결된 카드</th>

            {/* 관리자 */}
            <th>관리자</th>

            {/* 비고 */}
            <th>비고</th>
        </tr>
    );
});
BankAccountTableHeader.displayName = 'BankAccountTableHeader';
