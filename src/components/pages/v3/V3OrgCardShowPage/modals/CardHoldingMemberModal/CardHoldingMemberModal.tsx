import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {DefaultButton} from '^components/Button';
import {creditcardAtom, inputCardHoldingMemeberModal, selectAppModal} from '../atom';
import {useRecoilState} from 'recoil';
import {CardHoldingMemberMultiSelect} from '^components/pages/v3/V3OrgCardShowPage/modals/CardHoldingMemberModal/CardHoldingMemberMultiSelect';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useToast} from '^hooks/useToast';

export interface IdDto {
    id: number;
}
export const CardHoldingMember = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardHoldingMemeberModal);
    const {open: openSelectAppModal} = useModal(selectAppModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const form = useForm<IdDto>();
    const {toast} = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }

        inputRef.current?.focus();
    }, [isShow]);

    // TODO: 멤버 아이디로 수정
    const submitCardHoldingMember = () => {
        const cardHoldingMember = form.getValues('id');
        if (!cardHoldingMember) return;
        setCreditCardData({...creditCardData, holdingMemberId: cardHoldingMember});
    };

    const updateCardHoldingMember = async () => {
        const cardHoldingMember = form.getValues('id');
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

            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                    <h2 className="h1 leading-tight">
                        카드를 소유하고 있는 <br /> 사람을 선택해주세요
                    </h2>
                </div>

                {/* 카드 소유자 input */}
                <CardHoldingMemberMultiSelect form={form} />

                {cardId ? (
                    <DefaultButton text="확인" type="button" onClick={updateCardHoldingMember} />
                ) : (
                    <DefaultButton
                        text="다음"
                        type="button"
                        onClick={() => {
                            openSelectAppModal();
                            submitCardHoldingMember();
                        }}
                    />
                )}
            </div>
        </Modal>
    );
});
