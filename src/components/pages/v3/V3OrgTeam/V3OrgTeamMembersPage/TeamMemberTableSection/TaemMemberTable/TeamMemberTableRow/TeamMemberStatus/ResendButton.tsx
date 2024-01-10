import React, {memo, useState} from 'react';
import {ApprovalStatus, c_ApprovalStatus, MembershipDto, t_ApprovalStatus} from '^models/Membership/types';
import {FaRegEnvelope} from 'react-icons/fa';
import {useSendInviteEmail, useTeamMembers} from '^models/TeamMember';
import {useAlert} from '^hooks/useAlert';
import {LoadingButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatus/LoadingButton';

interface ResendButtonProps {
    membership: MembershipDto;
}

export const ResendButton = memo((props: ResendButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {reload} = useTeamMembers();
    const {sendEmail} = useSendInviteEmail();

    const {membership} = props;

    const btnStyle = c_ApprovalStatus(membership.approvalStatus);
    const text = membership.approvalStatus === ApprovalStatus.PENDING && 'Resend';

    const onClick = async () => {
        const email = membership.invitedEmail;

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
                <button onClick={onClick} className={`${btnStyle} btn btn-sm btn-outline gap-2 normal-case`}>
                    <FaRegEnvelope />
                    {text}
                </button>
            )}
        </>
    );
});
