import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface Props extends ListTableHeaderProps {
    mode?: 1;
}

export const BillingHistoryTableHeaderOfInvoiceAccount = memo((props: Props) => {
    const {orderBy, mode = 1} = props;

    return (
        <tr className="bg-slate-100">
            <th>서비스명</th>
            <th>발행일</th>
            <th>구분</th>
            <th className="text-center">결제금액</th>
            <th>내용</th>
            <th />
            {/*<th>비고</th>*/}
        </tr>
    );
});
BillingHistoryTableHeaderOfInvoiceAccount.displayName = 'BillingHistoryTableHeaderOfInvoiceAccount';
