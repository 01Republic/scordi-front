import React, {memo, useEffect, useRef} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {InputCardNumber} from '^v3/share/modals/NewCardModal/NewCardModalV2/CardNumberInput/InputCardNumber';
import {CTAButton} from '^v3/share/modals/NewCardModal/NewCardModalV2/CTAButton';
import {NewCardModalTitle} from '^v3/share/modals/NewCardModal/NewCardModalV2/NewCardModalTitle';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';
import {CardNameInput} from '^v3/share/modals/NewCardModal/NewCardModalV2/CardNameInput';
import {useResetRecoilState} from 'recoil';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {FormControlGroup, RequiredFormControl} from '^components/util/form-control';

export const NewCardModalV2 = memo(() => {
    const {Modal, close, isShow} = useModal(newCardModalState);
    const resetCreateCreditCard = useResetRecoilState(createCreditCardDtoAtom);
    const cardNameRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        resetCreateCreditCard();
    }, [isShow]);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={() => close()} topbarPosition="sticky" />

            <MobileSection.Padding>
                {/*모달 타이틀*/}
                <NewCardModalTitle />
            </MobileSection.Padding>

            <MobileSection.Padding>
                <FormControlGroup>
                    {/*카드 번호 input*/}
                    <RequiredFormControl topLeftLabel="카드 번호">
                        <InputCardNumber nextFocusInputRef={cardNameRef} />
                    </RequiredFormControl>

                    {/*카드 별칭 input*/}
                    <RequiredFormControl topLeftLabel="카드 별칭">
                        <CardNameInput cardNameRef={cardNameRef} />
                    </RequiredFormControl>
                </FormControlGroup>
            </MobileSection.Padding>

            {/*CTA Button*/}
            <ModalLikeBottomBar>
                <CTAButton />
            </ModalLikeBottomBar>
        </Modal>
    );
});
