import React, {memo} from 'react';
import {useToast} from '^hooks/useToast';
import {c_ApprovalStatus, t_ApprovalStatus} from '^models/Membership/types';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberItem';

interface TeamMemberTableRowPropsTableRowProps {
    teamMember: TeamMemberDto;
}
export const TeamMemberTableRow = memo((props: TeamMemberTableRowPropsTableRowProps) => {
    const {toast} = useToast();
    const {teamMember} = props;

    if (!teamMember) return <></>;

    const currentMember = teamMember.membership;

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
                <p className="capitalize text-sm text-gray-500">
                    {currentMember ? currentMember.level.toLowerCase() : 'Member'}
                </p>
            </td>

            {/* 상태 */}
            <td>
                <p className="capitalize text-sm text-gray-500">
                    {currentMember ? (
                        <button
                            className={`${c_ApprovalStatus(
                                currentMember.approvalStatus,
                            )} btn btn-xs px-2 cursor-default`}
                        >
                            {t_ApprovalStatus(currentMember.approvalStatus)}
                        </button>
                    ) : (
                        <button onClick={() => toast.info('준비중입니다.')} className="btn btn-xs px-2">
                            초대하기
                        </button>
                    )}
                </p>
            </td>
        </tr>
    );
});
