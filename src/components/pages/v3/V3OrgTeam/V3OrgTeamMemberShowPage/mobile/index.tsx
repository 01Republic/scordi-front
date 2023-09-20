import {memo} from 'react';
import {useCurrentTeamMember} from '^pages/v3/orgs/[orgId]/teams/members/atom';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';

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
