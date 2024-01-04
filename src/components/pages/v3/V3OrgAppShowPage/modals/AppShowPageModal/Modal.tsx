import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ModalTopbar} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {AppShowPageBody} from './AppShowPageBody';
import {useAppShowModal} from './hook';
import {SelectTeamMemberModal} from './SelectTeamMemberModal';
import {DeleteButton} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/DeleteButton';
import {useDashboardSubscriptions, useSubscriptionListTableSection} from '^models/Subscription/hook';
import {useRouter} from 'next/router';
import {RegisterCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal';

interface AppShowPageModalProps {
    onMemberChanged?: () => any;
}

export const AppShowPageModal = memo((props: AppShowPageModalProps) => {
    const router = useRouter();
    const {Modal, hide} = useAppShowModal();
    const {reload: dashboardReload} = useDashboardSubscriptions();
    const {reload: subscriptionTableReload} = useSubscriptionListTableSection();
    const {currentSubscription, loadCurrentSubscription, deleteCurrentSubscription} = useCurrentSubscription();
    const {search: loadCurrentHistories} = useBillingHistoriesV3();
    const {onMemberChanged} = props;

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

    const onClose = () => {
        onMemberChanged && onMemberChanged();
        hide();
    };
    const reload = () => {
        const url = router.pathname;
        console.log('\nurl', url);
        if (url.includes('apps')) {
            subscriptionTableReload();
        } else {
            dashboardReload();
        }
    };

    const onConfirm = () => {
        hide();
        reload();
    };

    const deleteFn = () => deleteCurrentSubscription({onConfirm});
    const DeleteButtonWrap = () => <DeleteButton isShow={true} onClick={deleteFn} />;

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]" onClose={onClose}>
                <ModalTopbar
                    title={currentSubscription ? currentSubscription.product.name() : ''}
                    backBtnOnClick={onClose}
                    topbarPosition="sticky"
                    rightButtons={[DeleteButtonWrap]}
                />
                <MobileSection.List>
                    <AppShowPageBody />
                </MobileSection.List>
            </Modal>
            <SelectTeamMemberModal afterChange={onMemberChanged} />
            <RegisterCreditCardModal />
        </>
    );
});
