import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {inputCardNumberModal, selectCardCompanyModal, createCreditCardDtoAtom} from '../atom';
import {useToast} from '^hooks/useToast';
import {InputCardNumber} from './InputCardNumber';
import {creditCardSignAtom} from '../../atom';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {UnSignedCreditCardFormData} from '^types/credit-cards.type';
import {plainToInstance} from 'class-transformer';

export const CardNumberModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNumberModal);
    const {open: openInputCardCompanyModal} = useModal(selectCardCompanyModal);
    const form = useForm<UnSignedCreditCardFormData>();
    const [createCreditCardDto, setCreateCreditCardDto] = useRecoilState(createCreditCardDtoAtom);
    const [disabled, setDisabled] = useState(true);
    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
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

        // TODO: [to.진경님] api 요청(request)에 대한 응답(response)은 관례적으로 res 라고 변수명을 쓰고 있어욥
        //  'const res = ...' 또는 'const { data } = ...' 로 변경해주시면 더 깔끔할 것 같아요!
        const datas = await creditCardApi.update(orgId, cardId, formData.toUpdateDto());

        if (datas) {
            setCardSignInfo(datas.data.secretInfo);
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