import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface BillingHistoryTableHeaderOfCreditCardProps extends ListTableHeaderProps {}

export const BillingHistoryTableHeaderOfCreditCard = memo((props: BillingHistoryTableHeaderOfCreditCardProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th>일시</th>
            <th>상태</th>
            <th>내용</th>
            <th className="text-center">결제금액</th>
            <th>연결된 구독</th>
            <th>비고</th>
        </tr>
    );
});
BillingHistoryTableHeaderOfCreditCard.displayName = 'BillingHistoryTableHeaderOfCreditCard';
