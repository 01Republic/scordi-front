import React, {memo} from 'react';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';

// interface V3OrgTeamsPageProps extends WithChildren {}

export const V3OrgTeamShowPage = memo(() => {
    // const {children} = props;

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Members}>
            <div>
                <p>V3OrgTeamShowPage</p>
            </div>
        </V3MainLayout>
    );
});
