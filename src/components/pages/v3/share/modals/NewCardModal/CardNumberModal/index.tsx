import React, {memo, useEffect, useRef, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {createCreditCardDtoAtom} from '../atom';
import {useToast} from '^hooks/useToast';
import {InputCardNumber} from '^v3/share/modals/NewCardModal/NewCardModalV2/CardNumberInput/InputCardNumber';
import {orgIdParamState} from '^atoms/common';
import {creditCardApi} from '^models/CreditCard/api';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {plainToInstance} from 'class-transformer';
import {inputCardNumberModal} from './atom';
import {selectCardCompanyModal} from '../CardCompanyModal/atom';
import {cardIdParamState, creditCardSignAtom, currentCreditCardAtom} from '^models/CreditCard/atom';
import {UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {ModalButton} from '^v3/share/ModalButton';

export const CardNumberModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNumberModal);
    const {open: openInputCardCompanyModal} = useModal(selectCardCompanyModal);
    const form = useForm<UnSignedCreditCardFormData>();
    const [createCreditCardDto, setCreateCreditCardDto] = useRecoilState(createCreditCardDtoAtom);
    const [disabled, setDisabled] = useState(true);
    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const setCurrentCreditCard = useSetRecoilState(currentCreditCardAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const cardNameRef = useRef<HTMLInputElement>(null);
    const {toast} = useToast();

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }
    }, [isShow]);

    // 카드 번호 등록 함수
    const onSubmit = () => {
        const formData = plainToInstance(UnSignedCreditCardFormData, form.getValues());
        setCreateCreditCardDto({...createCreditCardDto, ...formData.toCreateDto()});

        openInputCardCompanyModal();
    };

    //카드 번호 수정 함수
    const onUpdate = async () => {
        if (!orgId || !cardId) return;

        const formData = plainToInstance(UnSignedCreditCardFormData, form.getValues());

        const res = await creditCardApi.update(orgId, cardId, formData.toUpdateDto());

        if (res) {
            setCardSignInfo(res.data.secretInfo);
            setCurrentCreditCard(res.data);
            close();
            toast.success('변경되었습니다.');
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={() => close()} topbarPosition="sticky" />
            <div>
                <MobileSection.Padding>
                    <div className="py-5 pt-10">
                        <p className="mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                        <h2 className="h1 leading-tight">카드 번호와 별칭을 입력해주세요</h2>
                    </div>

                    <InputCardNumber cardNameRef={cardNameRef} />
                </MobileSection.Padding>
                <ModalLikeBottomBar>
                    <ModalButton
                        onClick={cardId ? onUpdate : onSubmit}
                        text={cardId ? '확인' : '다음'}
                        isLoading={disabled}
                    />
                </ModalLikeBottomBar>
            </div>
        </Modal>
    );
});
