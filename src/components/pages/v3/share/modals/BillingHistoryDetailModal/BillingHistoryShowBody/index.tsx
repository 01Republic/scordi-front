import React, {memo} from 'react';
import {BillingHistoryInformationPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryInformationPanel';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {PrototypeAvatar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/PrototypeAvatar';
import {HeadingPrice} from '^v3/V3OrgBillingHistoryShowPage/HeadingPrice';

export const BillingHistoryShowBody = memo(() => {
    const {billingHistory} = useBillingHistoryInModal();

    if (!billingHistory) return <></>;
    return (
        <>
            <PrototypeAvatar proto={billingHistory.subscription?.product} />
            <HeadingPrice price={billingHistory.payAmount} />
            <BillingHistoryInformationPanel />
        </>
    );
});
