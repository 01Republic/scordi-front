import {memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {appShowDetailModal} from '^v3/V3OrgAppShowPage/modals/AppDetailModel/atom';
import {useCurrentSubscription} from '^models/Subscription/hook';

export const AppDetailModal = memo(() => {
    const {close, Modal} = useModal(appShowDetailModal);
    const {currentSubscription} = useCurrentSubscription();

    if (!currentSubscription) return <></>;

    return (
        <Modal>
            <ModalTopbar title={currentSubscription.product.name()} backBtnOnClick={close} />
        </Modal>
    );
});
