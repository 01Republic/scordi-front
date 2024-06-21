import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface TeamMemberTableHeaderProps extends ListTableHeaderProps {}

export const TeamMemberTableHeader = memo((props: TeamMemberTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr>
            <SortableTH sortKey="[name]" onClick={orderBy} className="!bg-slate-100 rounded-tl-md">
                이름
            </SortableTH>
            {/* 팀 */}
            <SortableTH sortKey="[teams][id]" onClick={orderBy} className="!bg-slate-100">
                팀
            </SortableTH>

            <th className="bg-slate-100">이메일</th>
            <th className="bg-slate-100">전화번호</th>

            {/* 이용 앱 수 */}
            <SortableTH sortKey="[subscriptionCount]" sortVal="DESC" onClick={orderBy} className="!bg-slate-100">
                이용 앱 수
            </SortableTH>

            {/*/!* 권한 *!/*/}
            {/*<th className="bg-slate-100" />*/}
            {/*<SortableTH sortKey="[membership][level]" onClick={onSort} className="justify-center">*/}
            {/*    권한*/}
            {/*</SortableTH>*/}

            {/* 상태 */}
            <th className="bg-slate-100 rounded-tr-md" />
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
