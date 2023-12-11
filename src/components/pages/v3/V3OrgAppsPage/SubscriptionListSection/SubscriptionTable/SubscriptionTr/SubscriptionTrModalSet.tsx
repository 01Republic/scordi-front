import {memo} from 'react';
import {AppShowPageModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal';
import {AccountListModal} from '^v3/share/modals/AccountListModal';

export const SubscriptionTrModalSet = memo(function SubscriptionTrModalSet() {
    return (
        <>
            <AppShowPageModal />
            <AccountListModal />
        </>
    );
});
