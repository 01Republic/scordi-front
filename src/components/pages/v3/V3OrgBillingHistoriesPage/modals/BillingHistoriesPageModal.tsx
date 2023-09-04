import {atom, useRecoilValue} from 'recoil';
import React, {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {useRouter} from 'next/router';
import {ModalTopbar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoriesPageBody} from '../BillingHistoriesPageBody';

export const billingHistoriesPayModal = {
    isShowAtom: atom({
        key: 'v3/billingHistoriesPageModalIsShow',
        default: false,
    }),
    popStateSyncKey: 'billingHistoriesPageModal',
};

export const BillingHistoriesPageModal = memo(() => {
    const router = useRouter();
    const {isShow, close, Modal, CloseButton} = useModal(billingHistoriesPayModal);
    const currentOrg = useRecoilValue(currentOrgAtom);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} />
            <MobileSection.List>{isShow && <BillingHistoriesPageBody />}</MobileSection.List>
        </Modal>
    );
});
