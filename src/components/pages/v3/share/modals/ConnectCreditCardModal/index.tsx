import React, {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {connectCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal/atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {ConnectCardModalTitle} from '^v3/share/modals/ConnectCreditCardModal/ConnectCardModalTitle';
import {CardSelect} from '^v3/share/modals/ConnectCreditCardModal/CardSelect';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {FormControl} from '^components/util/form-control/FormControl';
import {CTAButton} from '^v3/share/modals/ConnectCreditCardModal/CTAButton';
import {useCreditCards} from '^models/CreditCard/hook';

export const RegisterCreditCardModal = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const {Modal, close, isShow} = useModal(connectCreditCardModal);
    const {search: getCreditCards} = useCreditCards();

    useEffect(() => {
        getCreditCards({});
    }, [isShow]);

    if (!currentSubscription) return <></>;

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.Padding>
                <ConnectCardModalTitle />

                <FormControl topLeftLabel="어떤 카드로 등록할까요?">
                    <CardSelect />
                </FormControl>
            </MobileSection.Padding>
            <ModalLikeBottomBar className="left-0">
                <CTAButton />
            </ModalLikeBottomBar>
        </Modal>
    );
});
