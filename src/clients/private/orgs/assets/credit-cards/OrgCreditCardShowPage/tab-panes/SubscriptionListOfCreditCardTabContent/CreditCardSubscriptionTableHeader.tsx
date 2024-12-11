import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

export const CreditCardSubscriptionTableHeader = memo(function (props: ListTableHeaderProps) {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th>서비스명</th>
            {/*<th>구독상태</th>*/}
            <th>결제주기</th>
            <th>결제금액</th>
            <th>갱신일</th>
            <th>소지자</th>
            <th>비고</th>
            <th />
        </tr>
    );
});
