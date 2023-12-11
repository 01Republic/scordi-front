import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import {TeamMemberDto} from '^models/TeamMember';
import {useTeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {TeamMemberItem} from './TeamMemberItem';
import {TeamMemberStatus} from './TeamMemberStatus';
import {TeamMemberRole} from './TeamMemberRole';

interface TeamMemberTableRowPropsTableRowProps {
    teamMember: TeamMemberDto;
}
export const TeamMemberTableRow = memo((props: TeamMemberTableRowPropsTableRowProps) => {
    // const currentUser = useRecoilValue(currentUserAtom);
    const memberShowModal = useTeamMemberShowModal();
    const {teamMember} = props;

    if (!teamMember) return <></>;

    const {membership, subscriptions} = teamMember;

    const openShowModal = () => memberShowModal.show(teamMember);

    const hoverBgColor = '';

    return (
        <tr onClick={openShowModal} className="cursor-pointer group">
            {/* 이름 */}
            <td className={`${hoverBgColor}`}>
                <TeamMemberItem item={teamMember} />
            </td>

            {/* 이용 앱 수 */}
            <td className={`${hoverBgColor} text-right`}>
                <p className="text-sm group-hover:text-scordi transition-all">
                    {subscriptions?.length} <small>Apps</small>
                </p>
            </td>

            {/* 팀 */}
            <td className={`${hoverBgColor} w-[25%]`}>&nbsp;</td>

            {/* 권한 */}
            <td className={`${hoverBgColor} text-right`}>
                <TeamMemberRole teamMember={teamMember} />
            </td>

            {/* 상태 */}
            <td className={`${hoverBgColor} text-right`}>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <TeamMemberStatus teamMember={teamMember} />
                </div>
            </td>
        </tr>
    );
});
