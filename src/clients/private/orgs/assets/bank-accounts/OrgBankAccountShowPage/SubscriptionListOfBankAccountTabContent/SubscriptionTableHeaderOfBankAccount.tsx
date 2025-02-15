import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable';

export const SubscriptionTableHeaderOfBankAccount = memo(function (props: ListTableHeaderProps) {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH sortKey={'[product][nameKo]'} onClick={orderBy}>
                구독명
            </SortableTH>
            <th>결제주기</th>
            <th>결제금액</th>
            <th>갱신일</th>
            <th>사용인원</th>
            <th>비고</th>
            <th />
        </tr>
    );
});
