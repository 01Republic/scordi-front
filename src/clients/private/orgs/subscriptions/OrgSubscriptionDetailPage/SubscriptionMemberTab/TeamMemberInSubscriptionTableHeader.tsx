import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface TeamMemberInSubscriptionTableHeaderProps extends ListTableHeaderProps {
    allSelected: boolean;
    onAllSelect: () => any;
}

export const TeamMemberInSubscriptionTableHeader = memo((props: TeamMemberInSubscriptionTableHeaderProps) => {
    const {orderBy} = props;
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

            <SortableTH sortKey="[name]" onClick={orderBy}>
                이름
            </SortableTH>

            <SortableTH sortKey="[teams][id]" onClick={orderBy}>
                팀
            </SortableTH>

            <th>상태</th>

            <th>이메일 계정</th>

            <th>계정부여(예정)일 ~ 계정회수(예정)일</th>

            <th>비고</th>

            <th />
        </tr>
    );
});
TeamMemberInSubscriptionTableHeader.displayName = 'TeamMemberTableHeader';
