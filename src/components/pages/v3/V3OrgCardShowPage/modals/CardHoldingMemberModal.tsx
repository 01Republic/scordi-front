import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {DefaultButton} from '^components/Button';
import {creditcardAtom, inputCardHoldingMemeberModal, selectAppModal} from './atom';
import {useRecoilState} from 'recoil';
import {CardHoldingMemberMultiSelect} from '^v3/V3OrgCardShowPage/modals/CardHoldingMemberMultiSelect';

export interface IdListDto {
    ids: number[];
}
export const CardHoldingMember = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardHoldingMemeberModal);
    const {open: openSelectAppModal} = useModal(selectAppModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const form = useForm<IdListDto>();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }

        inputRef.current?.focus();
    }, [isShow]);

    // TODO: 멤버 아이디로 수정
    const submitCardHoldingMember = () => {
        const cardHoldingMember = form.getValues('cardHoldingMember');
        if (!cardHoldingMember) return;

        // setCreditCardData({...creditCardData, holdingMemberId: cardHoldingMember});
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">새로운 카드 등록하기</p>
                    <h2 className="h1 leading-tight">
                        카드를 소유하고 있는 사람의 <br /> 이름을 입력해주세요
                    </h2>
                </div>

                {/* 카드 소유자 input */}
                <CardHoldingMemberMultiSelect form={form} />

                <DefaultButton
                    text="다음"
                    type="button"
                    onClick={() => {
                        openSelectAppModal();
                        submitCardHoldingMember();
                    }}
                />
            </div>
        </Modal>
    );
});
