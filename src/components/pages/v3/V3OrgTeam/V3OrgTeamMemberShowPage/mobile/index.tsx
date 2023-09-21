import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {TeamMemberInfoPanel} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/TeamMemberInfoPanel';
import {TeamListPanel} from '^v3/V3OrgTeam/V3OrgTeamsPage/mobile/TeamListPanel';
import {useCurrentTeamMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';

export const V3OrgTeamMemberShowPage = memo(() => {
    const {isLoading} = useCurrentTeamMember();

    return (
        <V3ModalLikeLayoutMobile>
            <MobileSection.List className="h-full">
                {isLoading ? (
                    <p className="text-center">loading ...</p>
                ) : (
                    <>
                        <TeamMemberInfoPanel />
                        <TeamListPanel />
                        {/*<TeamMemberSubscriptionListPanel />*/}
                    </>
                )}
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
