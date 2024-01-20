import React, {memo, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ModalTopbar} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useBillingHistoriesV3, useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {AppShowPageBody} from './AppShowPageBody';
import {useAppShowModal} from './hook';
import {SelectTeamMemberModal} from './SelectTeamMemberModal';
import {DeleteButton} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/DeleteButton';
import {RegisterCreditCardModal} from 'src/components/pages/v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterCreditCardModal';
import {RegisterAliasModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterAliasModal';
import {navTabIndex} from './AppShowPageBody/tabs/TabView';

interface AppShowPageModalProps {
    onClose?: () => any;
    onMemberChanged?: () => any;
}

export const AppShowPageModal = memo((props: AppShowPageModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);
    const setNavTab = useSetRecoilState(navTabIndex);
    const {Modal, hide} = useAppShowModal();
    const {currentSubscription, loadCurrentSubscription, deleteCurrentSubscription} = useCurrentSubscription();
    const {search: loadCurrentHistories} = useBillingHistoryListOfSubscription();
    const {onMemberChanged, onClose} = props;

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!appId || isNaN(appId)) return;

        loadCurrentSubscription(orgId, appId);
        loadCurrentHistories({
            where: {subscriptionId: appId, organizationId: orgId},
            order: {issuedAt: 'DESC'},
        });
    }, [orgId, appId]);

    const closeModal = () => {
        onClose && onClose();
        hide();
        setNavTab(0);
    };

    const deleteFn = () => deleteCurrentSubscription().then(() => closeModal());
    const DeleteButtonWrap = () => <DeleteButton isShow={true} onClick={deleteFn} />;

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]" onClose={closeModal}>
                <ModalTopbar
                    title={currentSubscription ? currentSubscription.product.name() : ''}
                    backBtnOnClick={closeModal}
                    topbarPosition="sticky"
                    rightButtons={[DeleteButtonWrap]}
                />
                <MobileSection.List>
                    <AppShowPageBody />
                </MobileSection.List>
            </Modal>
            <SelectTeamMemberModal afterChange={onMemberChanged} />
            <RegisterCreditCardModal />
            <RegisterAliasModal />
        </>
    );
});
