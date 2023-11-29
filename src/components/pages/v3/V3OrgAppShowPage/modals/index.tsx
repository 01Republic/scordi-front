import {atom, useRecoilValue} from 'recoil';
import React, {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '../../share/sections/MobileSection';
import {AppShowPageBody} from '^v3/V3OrgAppShowPage/AppShowPageBody';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';

export const appShowPageModal = {
    isShowAtom: atom({
        key: 'v3/appsPageModalIsShow',
        default: false,
    }),
    popStateSyncKey: 'appsPageModal',
};

export const AppShowPageModal = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {Modal, close} = useModal(appShowPageModal);

    const {loadCurrentSubscription} = useCurrentSubscription();
    const {search: loadCurrentHistories} = useBillingHistoriesV3();

    // const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);

    // FIXME: 네트워크 요청 에러 해결
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
                backBtnOnClick={close}
                topbarPosition="sticky"
            />
            <MobileSection.List>
                <AppShowPageBody />
            </MobileSection.List>
        </Modal>
    );
});
