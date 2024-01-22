import React, {memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {registerAliasModal} from '^v3/share/modals/AppShowPageModal/RegisterAliasModal/atom';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {RegisterAliasModalTitle} from '^v3/share/modals/AppShowPageModal/RegisterAliasModal/RegisterAliasModalTitle';
import {AliasInput} from '^v3/share/modals/AppShowPageModal/RegisterAliasModal/AliasInput';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {CTAButton} from '^v3/share/modals/AppShowPageModal/RegisterAliasModal/CTAButton';

interface RegisterAliasModalProps {
    afterChange?: () => void;
}

export const RegisterAliasModal = memo((props: RegisterAliasModalProps) => {
    const {Modal, close} = useModal(registerAliasModal);
    const {afterChange} = props;

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <RegisterAliasModalTitle />

                <AliasInput />
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                <CTAButton afterChange={afterChange} />
            </ModalLikeBottomBar>
        </Modal>
    );
});
