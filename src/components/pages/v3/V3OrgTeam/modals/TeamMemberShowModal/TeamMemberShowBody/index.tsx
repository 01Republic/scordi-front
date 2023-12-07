import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTeamMember, currentTeamMemberState} from '^models/TeamMember';
import {isTeamMemberEditModeAtom} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {TeamMemberInfoPanel} from './TeamMemberInfoPanel';
import {TeamMemberEditPanel} from './TeamMemberEditPanel';
import {TabView} from './tabs/TabView';

export const TeamMemberShowBody = memo(() => {
    const {isLoading} = useTeamMember(currentTeamMemberState);
    const isEditMode = useRecoilValue(isTeamMemberEditModeAtom);

    return (
        <>
            {isLoading ? (
                <p className="text-center">loading ...</p>
            ) : (
                <>
                    {isEditMode ? <TeamMemberEditPanel /> : <TeamMemberInfoPanel />}
                    <TabView />
                </>
            )}
        </>
    );
});
