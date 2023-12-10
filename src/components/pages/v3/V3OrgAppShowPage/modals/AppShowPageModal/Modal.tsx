import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ModalTopbar} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {AppShowPageBody} from './AppShowPageBody';
import {useAppShowModal} from './hook';

export const AppShowPageModal = memo(() => {
    const {Modal, hide} = useAppShowModal();
    const {currentSubscription, loadCurrentSubscription} = useCurrentSubscription();
    const {search: loadCurrentHistories} = useBillingHistoriesV3();

    // const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!appId || isNaN(appId)) return;

        loadCurrentSubscription(orgId, appId);
        loadCurrentHistories({
            where: {subscriptionId: appId, organizationId: orgId},
            order: {issuedAt: 'DESC'},
        });
    }, [orgId, appId]);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar
                title={currentSubscription ? currentSubscription.product.name() : ''}
                backBtnOnClick={hide}
                topbarPosition="sticky"
            />
            <MobileSection.List>
                <AppShowPageBody />
            </MobileSection.List>
        </Modal>
    );
});
