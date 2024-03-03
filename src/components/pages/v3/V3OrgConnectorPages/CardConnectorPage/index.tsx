import {memo} from 'react';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {CardBeforeConnectPage} from './CardBeforeConnectPage';

export const CardConnectorPage = memo(() => {
    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects}>
            <CardBeforeConnectPage />
        </V3MainLayout>
    );
});
