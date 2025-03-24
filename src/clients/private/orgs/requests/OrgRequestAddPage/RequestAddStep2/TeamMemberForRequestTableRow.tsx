import React, {memo, useState} from 'react';
import {teamMemberApi, TeamMemberDto, UpdateTeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {useOrgIdParam} from '^atoms/common';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface TeamMemberForRequestTableRowProps {
    teamMember: TeamMemberDto;
    onClick?: (teamMember: TeamMemberDto) => any;
    reload?: () => any;
    selected: boolean;
    onSelect: (selected: boolean) => any;
}

export const TeamMemberForRequestTableRow = memo((props: TeamMemberForRequestTableRowProps) => {
    const orgId = useOrgIdParam();
    const [isLoading, setIsLoading] = useState(false);
    const {teamMember, onClick, reload, selected, onSelect} = props;
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
            <td className={`${hoverBgColor} ${loadingStyle}`}>
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => onSelect && onSelect(e.target.checked)}
                    className="w-4 h-4 focus:ring-0 cursor-pointer"
                />
            </td>

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
        </tr>
    );
});
