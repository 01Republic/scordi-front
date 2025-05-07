import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface TeamMemberTableHeaderProps extends ListTableHeaderProps {
    isChecked?: boolean;
    onCheck?: (checked: boolean) => any;
}

export const TeamMembersTableHeader = memo((props: TeamMemberTableHeaderProps) => {
    const {isChecked, onCheck, orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th className="flex items-center justify-center pl-3 pr-1 !relative">
                <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-xs rounded bg-white"
                    defaultChecked={isChecked}
                    onChange={(e) => onCheck && onCheck(e.target.checked)}
                />
            </th>

            <SortableTH sortKey="[teamMember][name]" onClick={orderBy}>
                이름
            </SortableTH>

            {/* 구독 수 */}
            <SortableTH sortKey="[teamMember][subscriptionCount]" sortVal="DESC" onClick={orderBy}>
                구독 수
            </SortableTH>

            <th>이메일</th>
            <th>전화번호</th>
            <th>비고</th>

            {/* 권한 */}
            {/*<SortableTH sortKey="[teamMember][membership][level]" onClick={orderBy} className="justify-center">*/}
            {/*    권한*/}
            {/*</SortableTH>*/}

            <th />
        </tr>
    );
});
TeamMembersTableHeader.displayName = 'TeamMembersTableHeader';
