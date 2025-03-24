import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';

interface TeamMemberForRequestTableHeaderProps extends ListTableHeaderProps {
    allSelected: boolean;
    onAllSelect: () => any;
}

export const TeamMemberForRequestTableHeader = memo((props: TeamMemberForRequestTableHeaderProps) => {
    const {orderBy, allSelected, onAllSelect} = props;

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

            <th>스코디 이메일</th>

            <th>슬랙 메시지 발송 가능 여부</th>
        </tr>
    );
});
