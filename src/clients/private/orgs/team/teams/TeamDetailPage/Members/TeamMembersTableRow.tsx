import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamMemberStatusDropdown} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {TeamMemberRole} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberRole';

interface TeamMemberTableRowProps {
    teamMember: TeamMemberDto;
    onClick?: (teamMember: TeamMemberDto) => any;
    reload?: () => any;
}

export const TeamMembersTableRow = memo((props: TeamMemberTableRowProps) => {
    const {teamMember, onClick, reload} = props;
    const showPagePath = OrgTeamMemberShowPageRoute.path(teamMember.organizationId, teamMember.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    return (
        <tr className="group">
            {/* 이름 */}
            <td className={hoverBgColor} onClick={() => onClick && onClick(teamMember)}>
                <OpenButtonColumn href={showPagePath}>
                    <div
                        className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}
                    >
                        <TeamMemberAvatar teamMember={teamMember} className="w-8 h-8" />
                        <div className="overflow-x-hidden">
                            <p className="truncate text-14">
                                <span>{teamMember.name}</span>
                            </p>
                        </div>
                    </div>
                </OpenButtonColumn>
            </td>

            {/* 이메일 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 전화번호 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.phone}
                </p>
            </td>

            {/* 이용 앱 수 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.subscriptionCount.toLocaleString()} <small>Apps</small>
                </p>
            </td>

            {/* 권한 */}
            <td className={`cursor-pointer ${hoverBgColor}`}>
                <TeamMemberRole teamMember={teamMember} onChange={() => reload && reload()} />
            </td>

            {/* 상태 */}
            <td className={`text-right ${hoverBgColor}`}>
                <TeamMemberStatusDropdown teamMember={teamMember} reload={() => reload && reload()} />
            </td>
        </tr>
    );
});
TeamMembersTableRow.displayName = 'TeamMembersTableRow';
