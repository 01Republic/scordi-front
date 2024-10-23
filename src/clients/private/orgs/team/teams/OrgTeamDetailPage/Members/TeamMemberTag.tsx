import {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {MembershipLevel} from '^models/Membership/types';

interface TeamMemberTagProps {
    teamMember: TeamMemberDto;
    onChange: (level: MembershipLevel) => any;
}

export const TeamMemberTag = memo((props: TeamMemberTagProps) => {
    const {teamMember} = props;

    if (!teamMember) return null;
    return (
        <div className="flex items-center gap-2 px-2 py-1 bg-scordi-100 text-scordi rounded-full justify-center">
            <p className="text-12">{teamMember.membership?.level}</p>
        </div>
    );
});
