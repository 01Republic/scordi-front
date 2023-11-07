import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {createCreditCardDtoAtom} from '../atom';
import {useToast} from '^hooks/useToast';
import {InputCardNumber} from './InputCardNumber';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {plainToInstance} from 'class-transformer';
import {inputCardNumberModal} from './atom';
import {selectCardCompanyModal} from '../CardCompanyModal/atom';
import {creditCardSignAtom} from '^models/CreditCard/atom';
import {UnSignedCreditCardFormData} from '^models/CreditCard/credit-cards.type';

export const CardNumberModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNumberModal);
    const {open: openInputCardCompanyModal} = useModal(selectCardCompanyModal);
    const form = useForm<UnSignedCreditCardFormData>();
    const [createCreditCardDto, setCreateCreditCardDto] = useRecoilState(createCreditCardDtoAtom);
    const [disabled, setDisabled] = useState(true);
    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
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
        const formData = plainToInstance(UnSignedCreditCardFormData, form.getValues());

        const res = await creditCardApi.update(orgId, cardId, formData.toUpdateDto());

        if (res) {
            setCardSignInfo(res.data.secretInfo);
            close();
            toast.success('변경되었습니다.');
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <div>
                <MobileSection.Padding>
                    <div className="py-5 pt-10">
                        <p className="mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                        <h2 className="h1 leading-tight">카드 번호를 입력해주세요</h2>
                    </div>

                    <InputCardNumber form={form} setDisabled={setDisabled} />
                </MobileSection.Padding>
                <ModalLikeBottomBar>
                    {cardId ? (
                        <button disabled={disabled} onClick={onUpdate} className="btn-modal">
                            확인
                        </button>
                    ) : (
                        <button disabled={disabled} onClick={onSubmit} className="btn-modal">
                            다음
                        </button>
                    )}
                </ModalLikeBottomBar>
            </div>
        </Modal>
    );
});
