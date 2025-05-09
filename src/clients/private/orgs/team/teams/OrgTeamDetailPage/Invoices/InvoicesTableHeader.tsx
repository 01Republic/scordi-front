import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

type InvoicesTableHeaderProps = ListTableHeaderProps;

export const InvoicesTableHeader = memo((props: InvoicesTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH sortKey={'[invoiceAccount][email]'} onClick={orderBy}>
                이름
            </SortableTH>
            <th>구독 수</th>
            {/*<SortableTH sortKey={'[invoiceAccount][holdingMember][name]'} onClick={orderBy}>*/}
            {/*    담당자*/}
            {/*</SortableTH>*/}
            <th>비고</th>
            <th />
        </tr>
    );
});
InvoicesTableHeader.displayName = 'InvoicesTableHeader';
