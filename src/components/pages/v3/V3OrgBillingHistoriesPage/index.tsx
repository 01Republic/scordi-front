import {memo} from 'react';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BillingHistoriesPageBody} from './BillingHistoriesPageBody';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';

export const V3OrgBillingHistoriesPage = memo(() => {
    useFocusedMonth({cached: false});

    return (
        <V3MainLayoutMobile title="일정" activeTabIndex={1}>
            <BillingHistoriesPageBody />
        </V3MainLayoutMobile>
    );
});
