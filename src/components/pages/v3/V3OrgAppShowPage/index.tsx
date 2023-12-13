import React, {memo, useEffect} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {RegisterCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal';
import {AppShowPageBody} from './modals/AppShowPageModal/AppShowPageBody';
import {SelectTeamMemberModal} from './modals/AppShowPageModal/SelectTeamMemberModal';
import {InvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal';
import {useSetRecoilState} from 'recoil';

export const V3OrgAppShowPage = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const setAppId = useSetRecoilState(appIdState);

    useEffect(() => {
        if (!currentSubscription) return;
        setAppId(currentSubscription.id);
    }, [currentSubscription]);

    return (
        <V3ModalLikeLayoutMobile
            title={currentSubscription ? currentSubscription.product.name() : ''}
            modals={[
                BillingHistoryDetailModal,
                SelectTeamMemberModal,
                AccountListModal,
                RegisterCreditCardModal,
                InvoiceAccountSelectModal,
            ]}
        >
            <MobileSection.List className="h-full">
                <AppShowPageBody />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
