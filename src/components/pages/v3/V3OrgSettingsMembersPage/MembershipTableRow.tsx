import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember/type';
import {TeamMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/mobile/TeamMemberItem';
import {useToast} from '^hooks/useToast';
import {c_ApprovalStatus, t_ApprovalStatus} from '^models/Membership/types';

interface MembershipTableRowProps {
    teamMember: TeamMemberDto;
}

export const MembershipTableRow = memo((props: MembershipTableRowProps) => {
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
