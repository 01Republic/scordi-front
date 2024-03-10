import {memo} from 'react';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {NewCodefCardAccountPage} from './NewCodefCardAccountPage';

export const CardConnectorPage = memo(() => {
    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects}>
            <NewCodefCardAccountPage />
        </V3MainLayout>
    );
});
