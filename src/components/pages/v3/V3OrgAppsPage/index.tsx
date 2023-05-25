import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';

interface V3OrgAppsPageProps extends WithChildren {}

export const V3OrgAppsPage = memo((props: V3OrgAppsPageProps) => {
    const {children} = props;

    return (
        <V3MainLayout>
            <div>
                <p>V3OrgAppsPage</p>
            </div>
        </V3MainLayout>
    );
});
