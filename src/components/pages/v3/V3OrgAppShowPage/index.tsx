import React, {memo, useEffect} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {AppShowPageBody} from '^v3/share/modals/AppShowPageModal/AppShowPageBody';
import {SelectTeamMemberModal} from '^v3/share/modals/AppShowPageModal/SelectTeamMemberModal';
import {InvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {BillingHistoryDetailModalInAppShow} from '^v3/V3OrgAppsPage/_localModals/BillingHistoryDetailModal';
import {navTabIndex} from '^v3/share/modals/AppShowPageModal/AppShowPageBody/tabs/TabView';
import {NewBillingHistoryModalInAppShow} from '^v3/V3OrgAppsPage/_localModals';
import {NewSubscriptionModalInAppShow} from '^v3/V3OrgAppsPage/_localModals/NewSubscriptionModal';

export const V3OrgAppShowPage = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const setAppId = useSetRecoilState(appIdState);
    const resetTebIndex = useResetRecoilState(navTabIndex);

    useEffect(() => {
        if (!currentSubscription) return;

        setAppId(currentSubscription.id);
        resetTebIndex();
    }, [currentSubscription]);

    return (
        <V3ModalLikeLayoutMobile
            title={currentSubscription ? currentSubscription.product.name() : ''}
            modals={[
                NewSubscriptionModalInAppShow, // 새로운구독추가모달
                BillingHistoryDetailModalInAppShow, // 결제내역상세모달
                SelectTeamMemberModal,
                AccountListModal,
                InvoiceAccountSelectModal,
                NewBillingHistoryModalInAppShow, // 결제내역추가모달
            ]}
        >
            <MobileSection.List className="h-full">
                <AppShowPageBody />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
