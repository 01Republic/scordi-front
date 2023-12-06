import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useCurrentTeamMember, UpdateTeamMemberDto} from '^models/TeamMember';
import {TeamListPanel} from './TeamListPanel';
import {TeamMemberInfoPanel} from './TeamMemberInfoPanel';

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
