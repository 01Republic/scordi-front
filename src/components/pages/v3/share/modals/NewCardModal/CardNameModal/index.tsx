import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {createCreditCardDtoAtom} from '../atom';
import {orgIdParamState} from '^atoms/common';
import {creditCardApi} from '^models/CreditCard/api';
import {useToast} from '^hooks/useToast';
import {ModalLikeBottomBar} from '../../../../layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {SkipButton} from '^v3/share/modals/NewCardModal/SkipButton';
import {inputCardNameModal} from './atom';
import {inputCardHoldingMemberModal} from '../CardHoldingMemberModal/atom';
import {cardIdParamState, currentCreditCardAtom} from '^models/CreditCard/atom';

export const CardNameModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNameModal);
    const cardHolderModal = useModal(inputCardHoldingMemberModal);
    const [createCreditCardDto, setCreateCreditCardDto] = useRecoilState(createCreditCardDtoAtom);
    const [currentCreditCard, setCurrenCreditCard] = useRecoilState(currentCreditCardAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const form = useForm();
    const {toast} = useToast();

    useEffect(() => {
        cardId ? form.setValue('cardName', currentCreditCard.name) : form.reset();

        const cardNameInput = document.querySelector('input[name="cardName"]') as HTMLInputElement;
        cardNameInput?.focus();
    }, [isShow]);

    // 카드 이름 등록 함수
    const onSubmit = () => {
        const cardName = form.getValues('cardName');
        if (!cardName) return;

        setCreateCreditCardDto({...createCreditCardDto, name: cardName});
    };

    // 카드 이름 수정 함수
    const onUpdate = async () => {
        if (!orgId || isNaN(orgId) || !cardId || isNaN(cardId)) return;

        const cardName = form.getValues('cardName');
        console.log(cardName);

        const res = await creditCardApi.update(orgId, cardId, {
            name: cardName,
        });

        if (res) {
            setCurrenCreditCard(res.data);
            close();
            toast.success('변경되었습니다.');
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar
                backBtnOnClick={() => close()}
                topbarPosition="sticky"
                rightButtons={[
                    () => <SkipButton submitCardNumber={onSubmit} currentModal="cardName" isModify={!!cardId} />,
                ]}
            />
            <MobileSection.Padding>
                <p className="pt-10 mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                <h2 className="h1 leading-tight mb-10">
                    카드를 구분할 수 있는 <br /> 별칭을 입력해주세요
                </h2>

                {/* 카드 이름 input */}
                <input
                    {...form.register('cardName')}
                    name="cardName"
                    type="text"
                    placeholder="광고비 카드"
                    className="input input-bordered w-full"
                />
            </MobileSection.Padding>
            <ModalLikeBottomBar>
                {cardId ? (
                    <button onClick={onUpdate} className="btn-modal">
                        확인
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            onSubmit();
                            cardHolderModal.open();
                        }}
                        className="btn-modal"
                    >
                        다음
                    </button>
                )}
            </ModalLikeBottomBar>
        </Modal>
    );
});
