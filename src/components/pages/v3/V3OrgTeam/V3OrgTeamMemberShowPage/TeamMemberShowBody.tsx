import React, {memo} from 'react';
import {useCurrentTeamMember} from '^models/TeamMember/hook';
import {TeamMemberInfoPanel} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/TeamMemberInfoPanel';
import {TeamListPanel} from '^v3/V3OrgTeam/V3OrgTeamsPage/mobile/TeamListPanel';
import {UpdateTeamMemberDto} from '^models/TeamMember/type';
import {UseFormReturn} from 'react-hook-form';

interface TeamMemberShowBodyProps {
    form: UseFormReturn<UpdateTeamMemberDto>;
}

export const TeamMemberShowBody = memo((props: TeamMemberShowBodyProps) => {
    const {isLoading} = useCurrentTeamMember();
    const {form} = props;

    return (
        <>
            {isLoading ? (
                <p className="text-center">loading ...</p>
            ) : (
                <>
                    <TeamMemberInfoPanel form={form} />
                    <TeamListPanel />
                    {/*<TeamMemberSubscriptionListPanel />*/}
                </>
            )}
        </>
    );
});
