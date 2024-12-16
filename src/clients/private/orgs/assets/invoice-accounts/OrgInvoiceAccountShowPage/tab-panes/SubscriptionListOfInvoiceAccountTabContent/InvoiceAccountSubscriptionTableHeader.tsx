import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

export const InvoiceAccountSubscriptionTableHeader = memo((props: ListTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th>서비스명</th>
            {/*<th>구독상태</th>*/}
            <th>결제주기</th>

            <SortableTH
                // sortKey="[currentBillingAmount][dollarPrice]"
                sortVal="DESC"
                className="flex items-center justify-end"
            >
                결제금액
            </SortableTH>

            <th>갱신일</th>
            {/*<th>소지자</th>*/}
            <th>연결된 결제수단</th>
            <th>비고</th>
            <th />
        </tr>
    );
});
InvoiceAccountSubscriptionTableHeader.displayName = 'InvoiceAccountSubscriptionTableHeader';
