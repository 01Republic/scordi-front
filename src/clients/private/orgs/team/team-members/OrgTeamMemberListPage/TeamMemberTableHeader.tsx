import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface TeamMemberTableHeaderProps extends ListTableHeaderProps {}

export const TeamMemberTableHeader = memo((props: TeamMemberTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH sortKey="[name]" onClick={orderBy}>
                이름
            </SortableTH>

            {/* 구독 수 */}
            <SortableTH sortKey="[subscriptionCount]" sortVal="DESC" onClick={orderBy}>
                구독 수
            </SortableTH>

            {/* 팀 */}
            <SortableTH sortKey="[teams][id]" onClick={orderBy}>
                팀
            </SortableTH>

            <th>이메일</th>
            {/*<th>전화번호</th>*/}
            <th>비고</th>
            {/*/!* 권한 *!/*/}
            {/*<th />*/}
            {/*<SortableTH sortKey="[membership][level]" onClick={onSort} className="justify-center">*/}
            {/*    권한*/}
            {/*</SortableTH>*/}

            {/* 상태 */}
            <th />
            {/*<SortableTH*/}
            {/*    sortKey="[membership][approvalStatus]"*/}
            {/*    onClick={onSort}*/}
            {/*    className="mr-10 justify-end !bg-slate-100"*/}
            {/*>*/}
            {/*    초대 상태*/}
            {/*</SortableTH>*/}
        </tr>
    );
});
TeamMemberTableHeader.displayName = 'TeamMemberTableHeader';
