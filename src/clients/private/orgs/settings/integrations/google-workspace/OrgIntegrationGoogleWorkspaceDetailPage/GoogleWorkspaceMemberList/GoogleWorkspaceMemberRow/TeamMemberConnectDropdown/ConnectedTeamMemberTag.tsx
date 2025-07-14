import {memo} from 'react';
import {X} from 'lucide-react';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamMemberDto} from '^models/TeamMember';

interface ConnectedTeamMemberTagProps {
    teamMember: TeamMemberDto;
}

export const ConnectedTeamMemberTag = memo((props: ConnectedTeamMemberTagProps) => {
    const {teamMember} = props;

    return (
        <div className="flex items-center justify-between py-1 px-1.5">
            <TeamMemberProfileCompact item={teamMember} />
            {/*<div className="text-12 ml-1.5 opacity-70 hover:opacity-100">*/}
            {/*    <X />*/}
            {/*</div>*/}
        </div>
    );

    // return (
    //     <div className="flex items-center justify-between bg-white py-1 px-1.5 border border-gray-200/80 rounded-lg">
    //         <TeamMemberProfileCompact item={teamMember} />
    //         <div className="text-12 ml-1.5 opacity-70 hover:opacity-100">
    //             <X />
    //         </div>
    //     </div>
    // );
});
ConnectedTeamMemberTag.displayName = 'ConnectedTeamMemberTag';
