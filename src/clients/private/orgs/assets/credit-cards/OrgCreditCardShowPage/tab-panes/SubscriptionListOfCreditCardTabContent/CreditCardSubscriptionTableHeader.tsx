import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

export const CreditCardSubscriptionTableHeader = memo(function (props: ListTableHeaderProps) {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100 [--rounded-box:0.375rem]">
            <th>서비스 명</th>
            <th>사용인원</th>
            <th>과금</th>
            <th>최신 결제금액</th>
            <th>담당자</th>
        </tr>
    );
});
