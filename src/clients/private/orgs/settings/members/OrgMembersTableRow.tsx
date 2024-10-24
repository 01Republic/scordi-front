import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {TeamMemberTag} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMemberTag';
import {toast} from 'react-toastify';
import {confirm2} from '^components/util/dialog';
import {UserDto} from '^models/User/types';

interface TeamMemberTableRowProps {
    teamMember?: UserDto;
    onClick?: (teamMember: UserDto) => any;
    reload?: () => any;
}

export const OrgMembersTableRow = memo((props: TeamMemberTableRowProps) => {
    const {teamMember, onClick, reload} = props;
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const teamId = useRouterIdParamState('teamId', teamIdParamState);

    if (!teamMember) return null;

    const showPagePath = OrgTeamMemberShowPageRoute.path(orgId, teamMember.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all rounded-md';

    return (
        <tr className="group">
            {/* 이름 */}
            <td className={hoverBgColor} onClick={() => onClick && onClick(teamMember)}>
                <OpenButtonColumn href={showPagePath}>
                    <div
                        className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}
                    >
                        {/*<TeamMemberAvatar teamMember={teamMember} className="w-8 h-8" />*/}
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

            {/* 권한 */}
            <td className={`cursor-pointer ${hoverBgColor}`}>
                <TeamMemberTag level={teamMember.isAdmin ? 'ADMIN' : 'USER'} onChange={() => reload && reload()} />
            </td>
        </tr>
    );
});
OrgMembersTableRow.displayName = 'TeamMembersTableRow';
