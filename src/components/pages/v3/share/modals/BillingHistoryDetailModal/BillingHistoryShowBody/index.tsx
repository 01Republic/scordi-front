import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoryInformationPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryInformationPanel';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {PrototypeAvatar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/PrototypeAvatar';
import {HeadingPrice} from '^v3/V3OrgBillingHistoryShowPage/HeadingPrice';
import {ModalInfoSkeleton} from '^v3/share/Skeletons';

export const BillingHistoryShowBody = memo(() => {
    const {billingHistory, isLoading} = useBillingHistoryInModal();

    if (!billingHistory || isLoading) return <ModalInfoSkeleton />;

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="w-full h-[40px]" />

                <PrototypeAvatar proto={billingHistory.subscription?.product} />
                <HeadingPrice price={billingHistory.payAmount} />
                <BillingHistoryInformationPanel />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
