import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {RegisterCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal';
import {AppShowPageBody} from '^v3/V3OrgAppShowPage/AppShowPageBody';

export const V3OrgAppShowPage = memo(() => {
    const {currentSubscription} = useCurrentSubscription();

    return (
        <V3ModalLikeLayoutMobile
            title={currentSubscription ? currentSubscription.product.name() : ''}
            modals={[BillingHistoryDetailModal, AccountListModal, RegisterCreditCardModal]}
        >
            <MobileSection.List className="h-full">
                <AppShowPageBody />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
