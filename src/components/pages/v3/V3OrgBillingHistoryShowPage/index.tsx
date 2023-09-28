import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '../share/sections/MobileSection';

// Not used yet
export const V3OrgBillingHistoryShowPage = memo(() => {
    return (
        <V3ModalLikeLayoutMobile>
            <MobileSection.List className="h-full">
                <p className="no-selectable">V3OrgBillingHistoryDetailPage</p>
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
