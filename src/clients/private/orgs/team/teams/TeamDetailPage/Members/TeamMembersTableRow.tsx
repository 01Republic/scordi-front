import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamMemberStatusDropdown} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {TeamMemberRole} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberRole';
import Tippy from '@tippyjs/react';
import {FiMinusCircle} from '^components/react-icons';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {TeamMemberTag} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMemberTag';
import {toast} from 'react-toastify';

interface TeamMemberTableRowProps {
    teamMember?: TeamMemberDto;
    onClick?: (teamMember: TeamMemberDto) => any;
    reload?: () => any;
}

export const TeamMembersTableRow = memo((props: TeamMemberTableRowProps) => {
    const {teamMember, onClick, reload} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);

    if (!teamMember) return null;

    const showPagePath = OrgTeamMemberShowPageRoute.path(teamMember.organizationId, teamMember.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const onDelete = () => {
        teamMembershipApi.destroy(orgId, {teamId: teamId, teamMemberId: teamMember.id}).then(() => {
            toast.success('삭제했습니다');
            reload && reload();
        });
    };

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
                <TeamMemberTag teamMember={teamMember} onChange={() => reload && reload()} />
            </td>

            <td className={`${hoverBgColor}`}>
                <div className="flex items-center justify-end">
                    <Tippy content="이 팀에서 제거">
                        <div>
                            <FiMinusCircle
                                fontSize={24}
                                className="text-red-500 opacity-30 group-hover:opacity-100 transition-all cursor-pointer btn-animation"
                                onClick={onDelete}
                            />
                        </div>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
TeamMembersTableRow.displayName = 'TeamMembersTableRow';
