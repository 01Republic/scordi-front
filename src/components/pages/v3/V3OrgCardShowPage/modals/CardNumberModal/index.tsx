import React, {memo, useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import CryptoJS from 'crypto-js';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {DefaultButton} from '^components/Button';
import {creditcardAtom, inputCardNumberModal, selectCardCompanyModal} from '../atom';
import {CreditCardSecretInfo} from '^types/credit-cards.type';
import {cardSign} from '^config/environments';
import {useToast} from '^hooks/useToast';
import {AddOptionalData} from './AddOptionalData';

export const CardNumberModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNumberModal);
    const {open: openInputCardCompanyModal} = useModal(selectCardCompanyModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const [cardNumbers, setCardNumbers] = useState<CreditCardSecretInfo>({});
    const form = useForm();
    const {toast} = useToast();
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }
        inputRefs[0].current?.focus();
    }, [isShow]);

    const moveNextInput = (inputIndex: number, value: string) => {
        if (value.length === 4 && inputIndex < 3) {
            inputRefs[inputIndex + 1].current?.focus();
        }
    };

    const checkCardInfomations = () => {
        const cardNum1 = inputRefs[0].current?.value;
        const cardNum2 = inputRefs[1].current?.value;
        const cardNum3 = inputRefs[2].current?.value;
        const cardNum4 = inputRefs[3].current?.value;

        if (!cardNum1 && !cardNum2 && !cardNum3 && !cardNum4) {
            toast.error('카드 번호를 확인해주세요');
            return false;
        }

        const formExpiry = form.watch('expiry');
        const expiry = formExpiry.replace(' / ', '');
        const cvc = form.watch('cvc');

        setCardNumbers({
            ...cardNumbers,
            number1: cardNum1,
            number2: cardNum2,
            number3: cardNum3,
            number4: cardNum4,
            expiry: expiry,
            cvc: cvc,
        });
        return true;
    };

    // 카드 번호 등록 함수
    const submitCardInfomations = () => {
        const isCheckCardNumber = checkCardInfomations();

        if (!isCheckCardNumber) return;

        checkCardInfomations();

        const json = JSON.stringify(cardNumbers);
        const encrypted = CryptoJS.AES.encrypt(json, cardSign).toString();
        setCreditCardData({...creditCardData, sign: encrypted});

        const isCorporateCard = form.watch('isCorporateCard');
        const isPersonal = !isCorporateCard;

        setCreditCardData({...creditCardData, isPersonal: isPersonal});
        openInputCardCompanyModal();
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">새로운 카드 등록하기</p>
                    <h2 className="h1 leading-tight">카드 번호를 입력해주세요</h2>
                </div>

                <div>
                    {/* 카드번호 input */}
                    <label className="label label-text w-fit">
                        카드번호 <span className="text-red-500 pl-1">*</span>
                    </label>

                    <div className="flex gap-3 mb-3">
                        {inputRefs.map((inputRef, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="● ● ● ●"
                                pattern="\d*"
                                maxLength={4}
                                defaultValue={cardNumbers.number1 || ''}
                                className="input input-bordered w-full placeholder:text-[0.5rem]"
                                ref={inputRef}
                                onChange={(e) => {
                                    moveNextInput(index, e.target.value);
                                }}
                            />
                        ))}
                    </div>

                    <AddOptionalData form={form} />
                </div>

                <DefaultButton text="다음" type="button" onClick={submitCardInfomations} />
            </div>
        </Modal>
    );
});
