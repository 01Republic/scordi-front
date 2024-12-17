import React, {memo, useState} from 'react';
import {teamMemberApi, TeamMemberDto, UpdateTeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamMemberStatusDropdown} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {TeamDto} from '^models/Team/type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface TeamMemberTableRowProps {
    teamMember: TeamMemberDto;
    onClick?: (teamMember: TeamMemberDto) => any;
    reload?: () => any;
}

export const TeamMemberTableRow = memo((props: TeamMemberTableRowProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isLoading, setIsLoading] = useState(false);
    const {teamMember, onClick, reload} = props;
    const showPagePath = OrgTeamMemberShowPageRoute.path(teamMember.organizationId, teamMember.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';
    const loadingStyle = isLoading ? 'opacity-50 pointer-events-none' : '';

    const update = async (dto: UpdateTeamMemberDto) => {
        return teamMemberApi
            .update(orgId, teamMember.id, {notes: dto.notes})
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(errorToast)
            .finally(() => reload && reload());
    };

    return (
        <tr className="group">
            {/* 이름 */}
            <td className={`${hoverBgColor} ${loadingStyle}`} onClick={() => onClick && onClick(teamMember)}>
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

            {/* 구독 수 */}
            <td
                className={`cursor-pointer ${hoverBgColor} ${loadingStyle}`}
                onClick={() => onClick && onClick(teamMember)}
            >
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.subscriptionCount.toLocaleString()} <small>Apps</small>
                </p>
            </td>

            {/* 팀 */}
            <td className={`cursor-pointer ${hoverBgColor} ${loadingStyle}`}>
                <TeamSelect teamMember={teamMember} onChange={() => reload && reload()} />
            </td>

            {/* 이메일 */}
            <td
                className={`cursor-pointer ${hoverBgColor} ${loadingStyle}`}
                onClick={() => onClick && onClick(teamMember)}
            >
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 전화번호 */}
            <td
                className={`cursor-pointer ${hoverBgColor} ${loadingStyle}`}
                onClick={() => onClick && onClick(teamMember)}
            >
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.phone}
                </p>
            </td>

            {/* 비고 */}
            <td
                className={`cursor-pointer ${hoverBgColor} ${loadingStyle}`}
                onClick={() => onClick && onClick(teamMember)}
            >
                <AirInputText
                    defaultValue={teamMember.notes || undefined}
                    onChange={async (notes) => {
                        if (teamMember.notes === notes) return;
                        return update({notes});
                    }}
                />
            </td>

            {/*/!* 권한 *!/*/}
            {/*<td className={`cursor-pointer ${hoverBgColor}`}>*/}
            {/*    <TeamMemberRole teamMember={teamMember} onChange={() => reload && reload()} />*/}
            {/*</td>*/}

            {/* 상태 */}
            <td className={`text-right ${hoverBgColor}`}>
                <div className={`${isLoading ? 'btn btn-block btn-sm !bg-white link_to-loading' : ''}`}>
                    <TeamMemberStatusDropdown
                        teamMember={teamMember}
                        reload={() => reload && reload()}
                        setIsLoading={setIsLoading}
                    />
                </div>
            </td>
        </tr>
    );
});
TeamMemberTableRow.displayName = 'TeamMemberTableRow';
