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
import {RegisterCreditCardModal} from 'src/components/pages/v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterCreditCardModal';
import {RegisterAliasModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterAliasModal';

interface AppShowPageModalProps {
    onClose?: () => any;
    onMemberChanged?: () => any;
}

export const AppShowPageModal = memo((props: AppShowPageModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const appId = useRecoilValue(appIdState);
    const {Modal, hide} = useAppShowModal();
    const {currentSubscription, loadCurrentSubscription, deleteCurrentSubscription} = useCurrentSubscription();
    const {search: loadCurrentHistories} = useBillingHistoriesV3();
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
