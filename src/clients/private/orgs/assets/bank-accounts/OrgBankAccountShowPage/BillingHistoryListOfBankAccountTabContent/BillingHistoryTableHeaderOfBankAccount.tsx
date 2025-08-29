import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable';

interface BillingHistoryTableHeaderOfBankAccountProps extends ListTableHeaderProps {}

export const BillingHistoryTableHeaderOfBankAccount = memo((props: BillingHistoryTableHeaderOfBankAccountProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th>일시</th>
            <th>상태</th>
            <th>내용</th>
            <th className="text-center">결제금액</th>
            <th className="text-center">청구금액</th>
            <th>연결된 구독</th>
            <th>비고</th>
            <th />
        </tr>
    );
});
