import React, {memo, useState} from 'react';
import {teamMemberApi, TeamMemberDto, useSendInviteEmail, useTeamMembers} from '^models/TeamMember';
import {FaRegEnvelope} from 'react-icons/fa';
import {CgSpinner} from 'react-icons/cg';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

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
            reload();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return <>{isLoading ? <LoadingBtn /> : <InviteBtn onClick={() => onClick()} />}</>;
});

InviteButton.displayName = 'InviteButton';

interface InviteBtn {
    onClick: () => void;
}
const InviteBtn = (props: InviteBtn) => {
    const {onClick} = props;
    return (
        <button onClick={onClick} className="btn btn-sm normal-case gap-2 items-center">
            <FaRegEnvelope /> Invite
        </button>
    );
};

const LoadingBtn = () => {
    return (
        <button className="btn-disabled opacity-40 btn btn-sm btn-scordi btn-outline normal-case gap-2">
            <CgSpinner className="animate-spin" />
            Inviting
        </button>
    );
};
