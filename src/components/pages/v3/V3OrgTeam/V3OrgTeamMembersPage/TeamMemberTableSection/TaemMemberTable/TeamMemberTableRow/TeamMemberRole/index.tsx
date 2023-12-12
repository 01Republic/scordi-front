import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^models/User/atom';

interface TeamMemberRoleProps {
    teamMember: TeamMemberDto;
}

export const TeamMemberRole = memo((props: TeamMemberRoleProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {teamMember} = props;

    if (!teamMember || !currentUser) return <></>;

    const {membership} = teamMember;
    const isMe = teamMember.email === currentUser.email;

    if (isMe) return <p className="capitalize text-sm cursor-pointer">Owner</p>;
    if (membership) return <p className="capitalize text-sm cursor-pointer">{membership.level.toLowerCase()}</p>;

    return (
        <div className="tooltip tooltip-top cursor-pointer" data-tip="아직 워크스페이스에 초대되지 않은 사용자입니다.">
            <p className="capitalize text-sm italic text-gray-400">{'N/A'}</p>
        </div>
    );
});
TeamMemberRole.displayName = 'TeamMemberRole';
