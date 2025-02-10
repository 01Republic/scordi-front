import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface TeamMemberInSubscriptionTableHeaderProps extends ListTableHeaderProps {}

export const TeamMemberInSubscriptionTableHeader = memo((props: TeamMemberInSubscriptionTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH sortKey="[name]" onClick={orderBy}>
                이름
            </SortableTH>

            <SortableTH sortKey="[teams][id]" onClick={orderBy}>
                팀
            </SortableTH>

            <th>상태</th>

            <th>이메일 계정</th>

            <th>계정부여일</th>

            <th>계정회수(예정)일</th>

            <th>비고</th>

            <th />
        </tr>
    );
});
TeamMemberInSubscriptionTableHeader.displayName = 'TeamMemberTableHeader';
