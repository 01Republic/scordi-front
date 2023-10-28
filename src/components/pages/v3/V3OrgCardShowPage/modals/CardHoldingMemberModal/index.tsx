import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {creditcardAtom, inputCardHoldingMemeberModal, selectAppModal} from '../atom';
import {useRecoilState} from 'recoil';
import {SelectCardHoldingMember} from '^v3/V3OrgCardShowPage/modals/CardHoldingMemberModal/SelectCardHoldingMember';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useToast} from '^hooks/useToast';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {SkipButton} from '^v3/V3OrgCardShowPage/modals/SkipButton';

export interface HoldingMemberIdDto {
    holdingMemberId: number | null;
}
export const CardHoldingMember = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardHoldingMemeberModal);
    const {open: openSelectAppModal} = useModal(selectAppModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const form = useForm<HoldingMemberIdDto>();
    const {toast} = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }

        inputRef.current?.focus();
    }, [isShow]);

    const submitCardHoldingMember = () => {
        const cardHoldingMember = form.getValues('holdingMemberId');
        if (!cardHoldingMember) return;
        setCreditCardData({...creditCardData, holdingMemberId: cardHoldingMember});
    };

    const updateCardHoldingMember = async () => {
        const cardHoldingMember = form.getValues('holdingMemberId');
        if (!cardHoldingMember) return;

        const data = await creditCardApi.update(orgId, cardId, {holdingMemberId: cardHoldingMember});
        if (data) {
            toast.success('카드 소유자가 변경되었습니다.');
            setTimeout(() => {
                close();
            }, 2000);
            setCreditCardData({...creditCardData, holdingMemberId: cardHoldingMember});
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
                <SkipButton currentModal="cardHoldingMember" />

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
