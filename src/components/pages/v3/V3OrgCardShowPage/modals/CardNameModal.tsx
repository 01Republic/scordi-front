import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {DefaultButton} from '^components/Button';
import {creditcardAtom, inputCardNameModal, inputCardHoldingMemeberModal} from './atom';
import {useRecoilState} from 'recoil';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-crads.api';
import {useToast} from '^hooks/useToast';

export const CardNameModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNameModal);
    const {open: openInputCardHoldingMemeberModal} = useModal(inputCardHoldingMemeberModal);
    const [cardDetailInfo, setCardDetailInfo] = useRecoilState(creditcardAtom);

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

            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                    <h2 className="h1 leading-tight">
                        카드를 구분할 수 있는 <br /> 별칭을 입력해주세요
                    </h2>
                </div>

                {/* 카드 이름 input */}
                <div className="flex gap-3">
                    <input
                        {...form.register('cardName')}
                        type="text"
                        placeholder="개발팀"
                        defaultValue={cardDetailInfo.name ?? ''}
                        className="input input-bordered w-full"
                    />
                </div>
                {cardId ? (
                    <DefaultButton text="확인" type="button" onClick={updateCardNumber} />
                ) : (
                    <DefaultButton
                        text="다음"
                        type="button"
                        onClick={() => {
                            submitCardNumber();
                            openInputCardHoldingMemeberModal();
                        }}
                    />
                )}
            </div>
        </Modal>
    );
});
