import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {createCreditCardDtoAtom} from '../atom';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {SelectCardHoldingMember} from '^components/pages/v3/V3OrgCardListPage/modals/CardHoldingMemberModal/SelectCardHoldingMember';
import {orgIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useToast} from '^hooks/useToast';
import {ModalLikeBottomBar} from '^components/pages/v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {SkipButton} from '^components/pages/v3/V3OrgCardListPage/modals/SkipButton';
import {inputCardHoldingMemberModal} from './atom';
import {selectAppModal} from '../SelectAppModal/atom';
import {UnSignedCreditCardFormData} from '^models/CreditCard/credit-cards.type';
import {cardIdParamState, currentCreditCardAtom} from '^models/CreditCard/atom';

export const CardHoldingMember = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardHoldingMemberModal);
    const {open: openSelectAppModal} = useModal(selectAppModal);
    const [createCreditCardData, setCreateCreditCardData] = useRecoilState(createCreditCardDtoAtom);
    const setCurrenCreditCard = useSetRecoilState(currentCreditCardAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const form = useForm<UnSignedCreditCardFormData>();
    const {toast} = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }

        inputRef.current?.focus();
    }, [isShow]);

    const onSubmit = () => {
        const cardHoldingMemberId = form.getValues('holdingMemberId');
        if (!cardHoldingMemberId) return;

        setCreateCreditCardData({...createCreditCardData, holdingMemberId: cardHoldingMemberId});
    };

    const onUpdate = async () => {
        if (!orgId || isNaN(orgId) || !cardId || isNaN(cardId)) return;

        const holdingMemberId = form.getValues('holdingMemberId');
        if (!holdingMemberId) return;

        const res = await creditCardApi.update(orgId, cardId, {holdingMemberId: holdingMemberId});
        if (res) {
            setCurrenCreditCard(res.data);
            close();
            toast.success('변경되었습니다.');
        }
    };

    if (!orgId) return <></>;
    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar
                backBtnOnClick={() => close()}
                topbarPosition="sticky"
                rightButtons={[
                    () => (
                        <SkipButton submitCardNumber={onSubmit} currentModal="cardHoldingMember" isModify={!!cardId} />
                    ),
                ]}
            />
            <MobileSection.Padding>
                <p className="pt-10 mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                <h2 className="h1 leading-tight mb-10">
                    카드를 소유하고 있는 <br /> 사람을 선택해주세요
                </h2>

                {/* 카드 소유자 input */}
                <SelectCardHoldingMember form={form} />
            </MobileSection.Padding>
            <ModalLikeBottomBar>
                {cardId ? (
                    <button onClick={onUpdate} className="btn-modal">
                        확인
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            openSelectAppModal();
                            onSubmit();
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
