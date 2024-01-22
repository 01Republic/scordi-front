import React, {memo, useState} from 'react';
import {ApprovalStatus, c_ApprovalStatus} from '^models/Membership/types';
import {FaRegEnvelope} from 'react-icons/fa';
import {TeamMemberDto, useSendInviteEmail, useTeamMembers} from '^models/TeamMember';
import {LoadingButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatus/LoadingButton';
import {FaRotateRight} from 'react-icons/fa6';

interface ResendButtonProps {
    teamMember: TeamMemberDto;
}

export const ResendButton = memo((props: ResendButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {reload} = useTeamMembers();
    const {sendEmail} = useSendInviteEmail();

    const {teamMember} = props;

    const membership = teamMember?.membership;
    if (!membership) return <></>;

    const isPending = membership.approvalStatus === ApprovalStatus.PENDING;

    const onClick = async () => {
        const email = teamMember.email;

        if (!email) return;

        setIsLoading(true);

        try {
            await sendEmail(email);
            await reload();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingButton text="Resending" />
            ) : (
                <button
                    onClick={() => isPending && onClick()}
                    className={`btn btn-sm text-xs normal-case gap-2 items-center min-w-[105px] justify-start`}
                >
                    <FaRotateRight />
                    다시 보내기
                </button>
            )}
        </>
    );
});
