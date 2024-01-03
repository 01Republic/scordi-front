import React, {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {InputCardNumber} from '^v3/share/modals/NewCardModal/NewCardModalV2/CardNumberInput/InputCardNumber';
import {FormControl} from '^components/util/form-control/FormControl';
import {CTAButton} from '^v3/share/modals/NewCardModal/NewCardModalV2/CTAButton';
import {NewCardModalTitle} from '^v3/share/modals/NewCardModal/NewCardModalV2/NewCardModalTitle';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';

export const NewCardModalV2 = memo(() => {
    const {Modal, close, isShow} = useModal(newCardModalState);
    const form = useForm<UnSignedCreditCardFormData>();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (!isShow) form.reset();
    }, [isShow]);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={() => close()} topbarPosition="sticky" />
            <div>
                <MobileSection.Padding>
                    {/*모달 타이틀*/}
                    <NewCardModalTitle />

                    {/*카드 번호 input*/}
                    <FormControl
                        topLeftLabel={
                            <p className="flex items-center gap-1">
                                카드 번호 <span className="text-red-500 self-center">*</span>
                            </p>
                        }
                    >
                        <InputCardNumber form={form} setDisabled={setDisabled} />
                    </FormControl>

                    {/*카드 별칭 input*/}
                    <FormControl
                        topLeftLabel={
                            <p className="flex items-center gap-1">
                                카드 별칭 <span className="text-red-500 self-center">*</span>
                            </p>
                        }
                    >
                        <input
                            onChange={(e) => form.setValue('name', e.target.value)}
                            name="cardName"
                            type="text"
                            placeholder="광고비 카드"
                            className="input input-bordered w-full"
                        />
                    </FormControl>
                </MobileSection.Padding>

                {/*CTA Button*/}
                <ModalLikeBottomBar>
                    <CTAButton form={form} disabled={disabled} />
                </ModalLikeBottomBar>
            </div>
        </Modal>
    );
});
