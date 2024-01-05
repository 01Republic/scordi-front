import React, {memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {registerAliasModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterAliasModal/atom';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {RegisterAliasModalTitle} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterAliasModal/RegisterAliasModalTitle';
import {AliasInput} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterAliasModal/AliasInput';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {CTAButton} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterAliasModal/CTAButton';

export const RegisterAliasModal = memo(() => {
    const {Modal, close} = useModal(registerAliasModal);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <RegisterAliasModalTitle />

                <AliasInput />
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                <CTAButton />
            </ModalLikeBottomBar>
        </Modal>
    );
});
