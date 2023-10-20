import {memo} from 'react';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BillingHistoriesPageBody} from './BillingHistoriesPageBody';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';

export const V3OrgBillingHistoriesPage = memo(() => {
    useFocusedMonth({cached: false});

    return (
        <V3MainLayoutMobile title="일정" activeTabIndex={BottomTabIndex.HISTORIES} modals={[BillingHistoryDetailModal]}>
            <BillingHistoriesPageBody />
        </V3MainLayoutMobile>
    );
});
