import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {InformationPanel} from './InformationPanel';
import {BillingHistoryContentPanel} from './BillingHistoryContentPanel';

export const V3OrgAppShowPage = memo(() => {
    return (
        <V3ModalLikeLayoutMobile>
            <MobileSection.List className="h-full">
                <InformationPanel />
                <BillingHistoryContentPanel />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
