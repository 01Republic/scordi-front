import {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCurrentTeamMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';

export const V3OrgTeamMemberShowPage = memo(() => {
    const {currentTeamMember} = useCurrentTeamMember();

    return (
        <V3ModalLikeLayoutMobile>
            <MobileSection.List className="h-full">
                {/*<TeamInfoPanel />*/}
                {/*<TeamListPanel />*/}
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
