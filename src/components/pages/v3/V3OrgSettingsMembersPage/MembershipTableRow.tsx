import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember/type';
import {TeamMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/mobile/TeamMemberItem';

interface MembershipTableRowProps {
    teamMember: TeamMemberDto;
}

export const MembershipTableRow = memo((props: MembershipTableRowProps) => {
    const {teamMember} = props;

    const currentMember = teamMember.membership;

    if (!currentMember) return <></>;

    return (
        <tr>
            {/* 이름 */}
            <td>
                <TeamMemberItem item={teamMember} />
            </td>

            {/* 팀 */}
            <td></td>

            {/* 권한 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{currentMember.level.toLowerCase()}</p>
            </td>

            {/* 상태 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{currentMember.approvalStatus.toLowerCase()}</p>
            </td>
        </tr>
    );
});
