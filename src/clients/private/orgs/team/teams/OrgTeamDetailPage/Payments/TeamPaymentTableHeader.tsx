import React, {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

type TeamPaymentTableHeaderProps = ListTableHeaderProps;

export const TeamPaymentTableHeader = memo((props: TeamPaymentTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/* 카드 프로필 */}
            <SortableTH sortKey="[creditCard][name]" onClick={orderBy}>
                이름
            </SortableTH>

            {/* 상태 (editable, sortable) */}
            <SortableTH sortKey="[creditCard][usingStatus]" onClick={orderBy}>
                상태
            </SortableTH>

            {/* 소지자 */}
            <SortableTH sortKey={'[creditCard][holdingMember][name]'} onClick={orderBy}>
                소지자
            </SortableTH>

            <th>비고</th>

            <th />
        </tr>
    );
});
TeamPaymentTableHeader.displayName = 'TeamPaymentTableHeader';
