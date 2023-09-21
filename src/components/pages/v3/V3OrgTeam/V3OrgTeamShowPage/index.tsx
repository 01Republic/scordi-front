import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';

// interface V3OrgTeamsPageProps extends WithChildren {}

export const V3OrgTeamShowPage = memo(() => {
    // const {children} = props;

    return (
        <V3MainLayout>
            <div>
                <p>V3OrgTeamShowPage</p>
            </div>
        </V3MainLayout>
    );
});
