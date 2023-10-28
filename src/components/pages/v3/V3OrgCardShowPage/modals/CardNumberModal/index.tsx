import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm, UseFormReturn} from 'react-hook-form';
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

    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const {toast} = useToast();

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }
    }, [isShow]);

    const checkCardInformation = () => {
        const cardNum1 = form.watch('number1');
        const cardNum2 = form.watch('number2');
        const cardNum3 = form.watch('number3');
        const cardNum4 = form.watch('number4');

        if (!cardNum1 && !cardNum2 && !cardNum3 && !cardNum4) {
            toast.error('카드 번호를 확인해주세요');
            return false;
        }

        return true;
    };

    // 카드 번호 등록 함수
    const submitCardInformation = () => {
        const isCheckCardNumber = checkCardInformation();
        if (!isCheckCardNumber) return;

        const formData = plainToInstance(UnSignedCreditCardFormData, form.getValues());
        console.log(formData);
        setCreateCreditCardDto({...createCreditCardDto, ...formData.toCreateDto()});

        openInputCardCompanyModal();
    };

    //카드 번호 수정 함수
    const updateCardInformation = async () => {
        const isCheckCardNumber = checkCardInformation();
        if (!isCheckCardNumber) return;

        const formData = form.getValues();
        // setUpdateCreditCardDto(formData);

        creditCardApi.update(orgId, cardId, formData.toUpdateDto()).then((response) => {
            if (response.status === 200) {
                toast.success('카드번호가 수정되었습니다');
                setCardSignInfo(response.data.secretInfo);

                setTimeout(() => {
                    close();
                }, 2000);
            } else {
                toast.error('카드번호 수정에 실패했습니다.');
                return;
            }
        });
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <form>
                <MobileSection.Padding>
                    <div className="py-5 pt-20">
                        <p className="mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                        <h2 className="h1 leading-tight">카드 번호를 입력해주세요</h2>
                    </div>

                    <InputCardNumber form={form} />
                </MobileSection.Padding>
                <ModalLikeBottomBar>
                    {cardId ? (
                        <button onClick={updateCardInformation} className="btn-modal">
                            확인
                        </button>
                    ) : (
                        <button onClick={submitCardInformation} className="btn-modal">
                            다음
                        </button>
                    )}
                </ModalLikeBottomBar>
            </form>
        </Modal>
    );
});
