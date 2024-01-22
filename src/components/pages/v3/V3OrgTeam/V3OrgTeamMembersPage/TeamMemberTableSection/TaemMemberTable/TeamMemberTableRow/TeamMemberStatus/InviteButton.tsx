import React, {memo, useState} from 'react';
import {TeamMemberDto, useSendInviteEmail, useTeamMembers} from '^models/TeamMember';
import {FaRegEnvelope} from 'react-icons/fa';
import {LoadingButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatus/LoadingButton';

interface InviteButtonProps {
    teamMember: TeamMemberDto;
}

export const InviteButton = memo((props: InviteButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {reload} = useTeamMembers();
    const {sendEmail} = useSendInviteEmail();
    const {teamMember} = props;

    const onClick = async () => {
        if (!teamMember.email || isLoading) return;
        setIsLoading(true);

        try {
            await sendEmail(teamMember.email, teamMember.id);
            await reload();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return <>{isLoading ? <LoadingButton text="Inviting" /> : <InviteBtn onClick={() => onClick()} />}</>;
});

InviteButton.displayName = 'InviteButton';

interface InviteBtn {
    onClick: () => void;
}
const InviteBtn = (props: InviteBtn) => {
    const {onClick} = props;
    return (
        <button
            onClick={onClick}
            className="btn btn-sm text-xs normal-case gap-2 items-center min-w-[105px] justify-start"
        >
            <FaRegEnvelope /> 초대 보내기
        </button>
    );
};
