import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTeamMember, currentTeamMemberState} from '^models/TeamMember';
import {isTeamMemberEditModeAtom} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {TeamMemberInfoPanel} from './TeamMemberInfoPanel';
import {TeamMemberEditPanel} from './TeamMemberEditPanel';
import {TabView} from './tabs/TabView';

interface TeamMemberShowBodyProp {
    onSubmit?: () => any;
}

export const TeamMemberShowBody = memo((props: TeamMemberShowBodyProp) => {
    const {isLoading} = useTeamMember(currentTeamMemberState);
    const isEditMode = useRecoilValue(isTeamMemberEditModeAtom);

    const {onSubmit} = props;

    return (
        <>
            {isLoading ? (
                <p className="text-center">loading ...</p>
            ) : (
                <>
                    {isEditMode ? <TeamMemberEditPanel onSubmit={onSubmit} /> : <TeamMemberInfoPanel />}
                    {!isEditMode && <TabView />}
                </>
            )}
        </>
    );
});
