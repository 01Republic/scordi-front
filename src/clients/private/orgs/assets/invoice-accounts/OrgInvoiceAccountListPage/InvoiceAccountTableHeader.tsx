import React, {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {BsFillInfoCircleFill} from 'react-icons/bs';
import Tippy from '@tippyjs/react';

interface InvoiceAccountTableHeaderProps extends ListTableHeaderProps {
    //
}

export const InvoiceAccountTableHeader = memo((props: InvoiceAccountTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/*이름*/}
            <SortableTH sortKey="[googleTokenData][name]" onClick={orderBy}>
                이름
            </SortableTH>

            {/*구독 수*/}
            <th>구독 수</th>

            {/*등록방식*/}
            <th className="flex gap-2">
                등록방식
                <Tippy content="연동된 메일은 구글 로고가 표시됩니다">
                    <div>
                        <BsFillInfoCircleFill fontSize={14} className="text-gray-400" />
                    </div>
                </Tippy>
            </th>

            {/*팀*/}
            <th>팀</th>

            {/*담당자*/}
            <th>담당자</th>

            {/* 비고 */}
            <th>비고</th>
        </tr>
    );
});
InvoiceAccountTableHeader.displayName = 'InvoiceAccountTableHeader';
