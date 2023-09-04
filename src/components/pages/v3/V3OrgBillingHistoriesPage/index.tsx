import {memo} from 'react';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BillingHistoriesPageBody} from './BillingHistoriesPageBody';

export const V3OrgBillingHistoriesPage = memo(() => {
    return (
        <V3MainLayoutMobile title="" activeTabIndex={1}>
            <BillingHistoriesPageBody />
        </V3MainLayoutMobile>
    );
});
