import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {updateCreditCardDtoAtom, inputCardNameModal, inputCardHoldingMemeberModal} from './atom';
import {useRecoilState} from 'recoil';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useToast} from '^hooks/useToast';

import {ModalLikeBottomBar} from '../../layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {SkipButton} from '^v3/V3OrgCardShowPage/modals/SkipButton';

export const CardNameModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNameModal);
    const {open: openInputCardHoldingMemeberModal} = useModal(inputCardHoldingMemeberModal);
    const [cardDetailInfo, setCardDetailInfo] = useRecoilState(updateCreditCardDtoAtom);

    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useForm();
    const {toast} = useToast();

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }

        inputRef.current?.focus();
    }, [isShow]);

    // 카드 이름 등록 함수
    const submitCardNumber = () => {
        const cardName = form.getValues('cardName');
        if (!cardName) return;

        setCardDetailInfo({...cardDetailInfo, name: cardName});
    };

    // 카드 이름 수정 함수
    const updateCardNumber = async () => {
        const cardName = form.getValues('cardName');
        if (!cardName) return;

        const data = await creditCardApi
            .update(orgId, cardId, {
                name: cardName,
            })
            .then((res) => {
                return res;
            });

        if (data) {
            if (!data.data) return;

            toast.success('카드 별칭이 변경되었습니다.');
            setTimeout(() => {
                close();
            }, 2000);
            setCardDetailInfo({...cardDetailInfo, name: cardName});
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.Padding>
                <p className="pt-20 mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                <h2 className="h1 leading-tight mb-10">
                    카드를 구분할 수 있는 <br /> 별칭을 입력해주세요
                </h2>
                <SkipButton currentModal="cardName" isModify={!!cardId} />

                {/* 카드 이름 input */}
                <input
                    {...form.register('cardName')}
                    type="text"
                    placeholder="광고비 카드"
                    defaultValue={cardDetailInfo.name ?? ''}
                    className="input input-bordered w-full"
                />
            </MobileSection.Padding>
            <ModalLikeBottomBar>
                {cardId ? (
                    <button onClick={updateCardNumber} className="btn-modal">
                        확인
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            submitCardNumber();
                            openInputCardHoldingMemeberModal();
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
