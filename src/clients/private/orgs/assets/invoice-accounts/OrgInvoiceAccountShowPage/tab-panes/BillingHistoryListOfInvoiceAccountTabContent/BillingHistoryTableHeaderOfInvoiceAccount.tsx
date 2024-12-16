import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

interface Props extends ListTableHeaderProps {
    mode?: 1;
}

export const BillingHistoryTableHeaderOfInvoiceAccount = memo((props: Props) => {
    const {orderBy, mode = 1} = props;

    return (
        <tr className="bg-slate-100">
            <th>일시</th>
            <th>상태</th>
            <th>내용</th>
            <th>연결된 구독</th>

            <SortableTH
                // sortKey="[currentBillingAmount][dollarPrice]"
                sortVal="DESC"
                className="flex items-center justify-end"
            >
                결제금액
            </SortableTH>

            <th>비고</th>
            <th />
        </tr>
    );
});
BillingHistoryTableHeaderOfInvoiceAccount.displayName = 'BillingHistoryTableHeaderOfInvoiceAccount';
