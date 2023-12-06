import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {UseFormReturn} from 'react-hook-form';
import {useCurrentTeamMember, UpdateTeamMemberDto} from '^models/TeamMember';
import {isTeamMemberEditModeAtom} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {TeamListPanel} from './TeamListPanel';
import {TeamMemberInfoPanel} from './TeamMemberInfoPanel';
import {TeamMemberEditPanel} from './TeamMemberEditPanel';

interface TeamMemberShowBodyProps {
    form: UseFormReturn<UpdateTeamMemberDto>;
}

export const TeamMemberShowBody = memo((props: TeamMemberShowBodyProps) => {
    const {isLoading} = useCurrentTeamMember();
    const isEditMode = useRecoilValue(isTeamMemberEditModeAtom);
    const {form} = props;

    return (
        <>
            {isLoading ? (
                <p className="text-center">loading ...</p>
            ) : (
                <>
                    {isEditMode ? <TeamMemberEditPanel /> : <TeamMemberInfoPanel form={form} />}
                    <TeamListPanel />
                    {/*<TeamMemberSubscriptionListPanel />*/}
                </>
            )}
        </>
    );
});
