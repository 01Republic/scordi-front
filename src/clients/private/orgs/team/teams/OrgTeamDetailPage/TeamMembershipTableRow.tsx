import React, {memo} from 'react';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {FiMinusCircle} from '^components/react-icons';
import Tippy from '@tippyjs/react';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {toast} from 'react-hot-toast';
import {confirm2} from '^components/util/dialog';

interface TeamMembershipTableRowProps {
    teamMembership: TeamMembershipDto;
    onClick?: (teamMembership: TeamMembershipDto) => any;
    reload?: () => any;
}

export const TeamMembershipTableRow = memo((props: TeamMembershipTableRowProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {teamMembership, reload, onClick} = props;
    const {teamId, teamMemberId} = teamMembership;
    const team = teamMembership.team!;
    const teamMember = teamMembership.teamMember!;

    const showPagePath = OrgTeamMemberShowPageRoute.path(orgId, teamMemberId);
    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const removeFromTeam = async () => {
        const isConfirmed = await confirm2('정말 팀에서 삭제할까요?', '').then((res) => res.isConfirmed);
        if (!isConfirmed) return;

        teamMembershipApi.destroy(orgId, {teamId, teamMemberId}).then(() => {
            toast.success('저장 완료');
            reload && reload();
        });
    };

    return (
        <tr className="group">
            {/* 이름 */}
            <td className={hoverBgColor} onClick={() => onClick && onClick(teamMembership)}>
                <OpenButtonColumn href={showPagePath}>
                    <div
                        className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm min-w-[130px]`}
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
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMembership)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 전화번호 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMembership)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.phone}
                </p>
            </td>

            {/* 이용 앱 수 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMembership)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.subscriptionCount.toLocaleString()} <small>Apps</small>
                </p>
            </td>

            {/*/!* 권한 *!/*/}
            {/*<td className={`cursor-pointer ${hoverBgColor}`}>*/}
            {/*    <TeamMemberRole teamMember={teamMember} onChange={() => reload && reload()} />*/}
            {/*</td>*/}

            {/* Actions */}
            <td className={`${hoverBgColor}`}>
                {/*<TeamMemberStatusDropdown teamMember={teamMember} reload={() => reload && reload()} />*/}
                <div className="flex items-center justify-end">
                    <Tippy content="이 팀에서 제거">
                        <div>
                            <FiMinusCircle
                                fontSize={24}
                                className="text-red-500 opacity-30 group-hover:opacity-100 transition-all cursor-pointer btn-animation"
                                onClick={removeFromTeam}
                            />
                        </div>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
TeamMembershipTableRow.displayName = 'TeamMembershipTableRow';
