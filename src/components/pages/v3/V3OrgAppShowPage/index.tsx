import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {InformationPanel} from './InformationPanel';
import {BillingHistoryContentPanel} from './BillingHistoryContentPanel';
import {BillingHistoryShowModal} from '^v3/V3OrgBillingHistoryShowPage/BillingHistoryShowModal';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';
import {AttachmentModal} from '^components/pages/LandingPages/TastingPage/AttachmentModal';
import {AccountListModal} from '^v3/share/modals/AccountListModal';

export const V3OrgAppShowPage = memo(() => {
    const {result} = useBillingHistoriesV3();

    return (
        <V3ModalLikeLayoutMobile modals={[BillingHistoryShowModal, AttachmentModal, AccountListModal]}>
            <MobileSection.List className="h-full">
                <InformationPanel />
                <BillingHistoryContentPanel billingHistories={result.items} />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
