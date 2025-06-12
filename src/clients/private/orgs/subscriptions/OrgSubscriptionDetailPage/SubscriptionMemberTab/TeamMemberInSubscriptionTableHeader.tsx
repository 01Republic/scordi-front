import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';

interface TeamMemberInSubscriptionTableHeaderProps {
    sortVal: 'ASC' | 'DESC';
    orderBy: (sortKey: string) => void;
    allSelected: boolean;
    onAllSelect: () => any;
}

export const TeamMemberInSubscriptionTableHeader = memo((props: TeamMemberInSubscriptionTableHeaderProps) => {
    const {sortVal, orderBy} = props;
    const {allSelected, onAllSelect} = props;

    return (
        <tr className="bg-slate-100">
            <th>
                <input
                    type="checkbox"
                    className="w-4 h-4 focus:ring-0 cursor-pointer"
                    checked={allSelected}
                    onChange={onAllSelect}
                />
            </th>

            <SortableTH2 sortKey="[teamMember][name]" sortVal={sortVal} onClick={orderBy}>
                이름
            </SortableTH2>

            <SortableTH2 sortKey="[teamMember][teams][name]" sortVal={sortVal} onClick={orderBy}>
                팀
            </SortableTH2>

            <th>상태</th>

            <th>이메일 계정</th>

            <th>계정부여(예정)일 ~ 계정회수(예정)일</th>

            <th>비고</th>

            <th />
        </tr>
    );
});
TeamMemberInSubscriptionTableHeader.displayName = 'TeamMemberTableHeader';
