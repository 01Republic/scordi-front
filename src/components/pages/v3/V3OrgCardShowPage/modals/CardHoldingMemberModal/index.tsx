import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {updateCreditCardDtoAtom, inputCardHoldingMemeberModal, selectAppModal, createCreditCardDtoAtom} from '../atom';
import {useRecoilState} from 'recoil';
import {SelectCardHoldingMember} from '^v3/V3OrgCardShowPage/modals/CardHoldingMemberModal/SelectCardHoldingMember';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useToast} from '^hooks/useToast';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {SkipButton} from '^v3/V3OrgCardShowPage/modals/SkipButton';
import {UnSignedCreditCardFormData} from '^types/credit-cards.type';

export const CardHoldingMember = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardHoldingMemeberModal);
    const {open: openSelectAppModal} = useModal(selectAppModal);
    const [createCreditCardData, setCreateCreditCardData] = useRecoilState(createCreditCardDtoAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const form = useForm<UnSignedCreditCardFormData>();
    const {toast} = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }

        inputRef.current?.focus();
    }, [isShow]);

    const submitCardHoldingMember = () => {
        const cardHoldingMemberId = form.getValues('holdingMemberId');
        if (!cardHoldingMemberId) return;

        setCreateCreditCardData({...createCreditCardData, holdingMemberId: cardHoldingMemberId});
    };

    const updateCardHoldingMember = async () => {
        const holdingMemberId = form.getValues('holdingMemberId');
        if (!holdingMemberId) return;

        const data = await creditCardApi.update(orgId, cardId, {holdingMemberId});
        if (data) {
            toast.success('카드 소유자가 변경되었습니다.');
            setTimeout(() => {
                close();
            }, 2000);
        }
    };

    if (!orgId) return <></>;
    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.Padding>
                <p className="pt-20 mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                <h2 className="h1 leading-tight mb-10">
                    카드를 소유하고 있는 <br /> 사람을 선택해주세요
                </h2>
                <SkipButton currentModal="cardHoldingMember" isModify={!!cardId} />

                {/* 카드 소유자 input */}
                <SelectCardHoldingMember form={form} />
            </MobileSection.Padding>
            <ModalLikeBottomBar>
                {cardId ? (
                    <button onClick={updateCardHoldingMember} className="btn-modal">
                        확인
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            openSelectAppModal();
                            submitCardHoldingMember();
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
