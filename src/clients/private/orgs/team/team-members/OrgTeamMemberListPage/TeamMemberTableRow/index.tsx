import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamMemberStatusDropdown} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown';
import {LinkTo} from '^components/util/LinkTo';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaRegFolderOpen} from 'react-icons/fa';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';

interface TeamMemberTableRowProps {
    teamMember: TeamMemberDto;
    onClick?: (teamMember: TeamMemberDto) => any;
    reload?: () => any;
}

export const TeamMemberTableRow = memo((props: TeamMemberTableRowProps) => {
    const {teamMember, onClick, reload} = props;
    const showPagePath = OrgTeamMemberShowPageRoute.path(teamMember.organizationId, teamMember.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    return (
        <tr className="group">
            {/* 이름 */}
            <td
                className={`cursor-pointer flex items-center justify-between ${hoverBgColor}`}
                onClick={() => onClick && onClick(teamMember)}
            >
                <div className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}>
                    <TeamMemberAvatar teamMember={teamMember} className="w-8 h-8" />
                    <div className="overflow-x-hidden">
                        <p className="truncate text-14">
                            <span>{teamMember.name}</span>
                        </p>
                    </div>
                </div>

                <div className="invisible group-hover:visible">
                    <LinkTo href={showPagePath} displayLoading={false}>
                        <TagUI className="border border-gray-200 bg-white btn-animation no-selectable gap-1 shadow hover:shadow-lg">
                            <FaRegFolderOpen size={10} />
                            <span className="text-10">열기</span>
                        </TagUI>
                    </LinkTo>
                </div>
            </td>

            {/* 팀 */}
            <td className={`cursor-pointer ${hoverBgColor}`}>
                <TeamSelect teamMember={teamMember} onChange={() => reload && reload()} />
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

            {/*/!* 권한 *!/*/}
            {/*<td className={`cursor-pointer ${hoverBgColor}`}>*/}
            {/*    <TeamMemberRole teamMember={teamMember} onChange={() => reload && reload()} />*/}
            {/*</td>*/}

            {/* 상태 */}
            <td className={`text-right ${hoverBgColor}`}>
                <TeamMemberStatusDropdown teamMember={teamMember} reload={() => reload && reload()} />
            </td>
        </tr>
    );
});
TeamMemberTableRow.displayName = 'TeamMemberTableRow';
