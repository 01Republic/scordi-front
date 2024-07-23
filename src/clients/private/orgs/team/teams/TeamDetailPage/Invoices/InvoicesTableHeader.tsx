import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

type InvoicesTableHeaderProps = ListTableHeaderProps;

export const InvoicesTableHeader = memo((props: InvoicesTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th>이름</th>
            <th>연결 구독 수</th>
            <th>등록방식</th>
            <th></th>
        </tr>
    );
});
InvoicesTableHeader.displayName = 'InvoicesTableHeader';
