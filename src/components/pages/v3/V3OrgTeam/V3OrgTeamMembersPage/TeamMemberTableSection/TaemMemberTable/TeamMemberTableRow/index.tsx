import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {useTeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamSelect} from './TeamSelect';
import {TeamMemberStatusDropdown} from './TeamMemberStatusDropdown';

interface TeamMemberTableRowPropsTableRowProps {
    teamMember: TeamMemberDto;
    reload?: () => any;
}

export const TeamMemberTableRow = memo((props: TeamMemberTableRowPropsTableRowProps) => {
    // const currentUser = useRecoilValue(currentUserAtom);
    const memberShowModal = useTeamMemberShowModal();
    const {teamMember, reload} = props;

    if (!teamMember) return <></>;

    const {membership, subscriptions} = teamMember;

    const openShowModal = () => memberShowModal.show(teamMember);

    const hoverBgColor = '';

    return (
        <tr className="">
            {/* 이름 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={openShowModal}>
                <TeamMemberProfile item={teamMember} />
            </td>

            {/* 이용 앱 수 */}
            <td className={`cursor-pointer ${hoverBgColor} `} onClick={openShowModal}>
                <p className="text-sm group-hover:text-scordi transition-all">
                    {teamMember.subscriptionCount} <small>Apps</small>
                </p>
            </td>

            {/* 팀 */}
            <td className={`${hoverBgColor}`}>
                <TeamSelect teamMember={teamMember} onChange={() => reload && reload()} />
            </td>

            {/*/!* 권한 *!/*/}
            {/*<td className={`${hoverBgColor} text-center`}>*/}
            {/*    <TeamMemberRole teamMember={teamMember} onChange={() => reload && reload()} />*/}
            {/*</td>*/}

            {/* 상태 */}
            <td className={`${hoverBgColor} text-right`}>
                {/*<TeamMemberStatus teamMember={teamMember} />*/}
                <TeamMemberStatusDropdown
                    teamMember={teamMember}
                    reload={() => reload && reload()}
                    setIsLoading={() => 1}
                />
            </td>
        </tr>
    );
});
