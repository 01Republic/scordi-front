import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable';

export const CreditCardTableHeaderOfBankAccount = memo(function (props: ListTableHeaderProps) {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH sortKey="[name]" onClick={orderBy}>
                이름
            </SortableTH>
            <th>종류</th>
            <th>유효기간</th>
            <th>소지자</th>
            <th>비고</th>
            <th />
        </tr>
    );
});
