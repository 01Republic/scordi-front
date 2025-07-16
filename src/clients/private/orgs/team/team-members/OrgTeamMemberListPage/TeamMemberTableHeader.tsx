import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';

interface TeamMemberTableHeaderProps {
    sortVal: 'ASC' | 'DESC';
    orderBy: (sortKey: string) => void;
}

export const TeamMemberTableHeader = memo((props: TeamMemberTableHeaderProps) => {
    const {sortVal, orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH2 sortKey="[name]" sortVal={sortVal} onClick={orderBy}>
                이름
            </SortableTH2>

            {/* 구독 수 */}
            <SortableTH2 sortKey="[subscriptionCount]" sortVal={sortVal} onClick={orderBy}>
                구독 수
            </SortableTH2>

            {/* 팀 */}
            <SortableTH2 sortKey="[teams][id]" sortVal={sortVal} onClick={orderBy}>
                팀
            </SortableTH2>

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
