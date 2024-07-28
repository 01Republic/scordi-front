import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

type TeamMemberTableHeaderProps = ListTableHeaderProps;

export const TeamMembersTableHeader = memo((props: TeamMemberTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH sortKey="[teamMember][name]" onClick={orderBy}>
                이름
            </SortableTH>

            <th>이메일</th>
            <th>전화번호</th>

            {/* 이용 앱 수 */}
            <SortableTH sortKey="[teamMember][subscriptionCount]" sortVal="DESC" onClick={orderBy}>
                이용 앱 수
            </SortableTH>

            {/* 권한 */}
            <SortableTH sortKey="[teamMember][membership][level]" onClick={orderBy} className="justify-center">
                권한
            </SortableTH>

            <th />
        </tr>
    );
});
TeamMembersTableHeader.displayName = 'TeamMembersTableHeader';
