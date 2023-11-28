import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {RegisterCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal';
import {AppShowPageBody} from '^v3/V3OrgAppShowPage/AppShowPageBody';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';

export const V3OrgAppShowPage = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {safePath} = useSafePathInCurrentOrg();

    const onClick = () => {
        safePath((org) => V3OrgAppsPageRoute.path(org.id));
    };

    return (
        <V3ModalLikeLayoutMobile
            title={currentSubscription ? currentSubscription.product.name() : ''}
            modals={[BillingHistoryDetailModal, AccountListModal, RegisterCreditCardModal]}
            backBtnOnClick={onClick}
        >
            <MobileSection.List className="h-full">
                <AppShowPageBody />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
