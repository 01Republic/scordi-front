import React, {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

interface TeamMembershipTableHeaderProps extends ListTableHeaderProps {}

export const TeamMembershipTableHeader = memo((props: TeamMembershipTableHeaderProps) => {
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

            {/*/!* 권한 *!/*/}
            {/*<th />*/}
            {/*<SortableTH sortKey="[membership][level]" onClick={onSort} className="justify-center">*/}
            {/*    권한*/}
            {/*</SortableTH>*/}

            {/* Actions */}
            <th />
        </tr>
    );
});
TeamMembershipTableHeader.displayName = 'TeamMembershipTableHeader';
