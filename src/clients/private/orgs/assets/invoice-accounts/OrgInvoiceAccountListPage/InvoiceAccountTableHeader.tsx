import React, {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface InvoiceAccountTableHeaderProps extends ListTableHeaderProps {
    //
}

export const InvoiceAccountTableHeader = memo((props: InvoiceAccountTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/*이름*/}
            <th>이름</th>

            {/*연결 구독 수*/}
            <th>연결 구독 수</th>

            {/*팀*/}
            <th>팀</th>

            {/*담당자*/}
            <th>담당자</th>

            {/* 비고 */}
            <th>비고</th>

            {/*등록방식*/}
            <th>등록방식</th>
        </tr>
    );
});
InvoiceAccountTableHeader.displayName = 'InvoiceAccountTableHeader';
