import React, {memo, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useModal} from '^components/pages/v3/share/modals/useModal';
import {ModalTopbar} from '^components/pages/v3/share/modals/ModalTopbar';
import {DefaultButton} from '^components/Button';
import {creditcardAtom, inputCardNumberModal, selectCardCompanyModal} from './atom';
import {useRecoilState} from 'recoil';
import {CreditCardSecretInfo} from '^types/credit-cards.type';
import CryptoJS from 'crypto-js';
import {cardSign} from '^config/environments';

export const CardNumberModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNumberModal);
    const {open: openInputCardCompanyModal} = useModal(selectCardCompanyModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const [cardNumbers, setCardNumbers] = useState<CreditCardSecretInfo>({});
    const form = useForm();
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    // const [disabled, setDisabled] = useState(true);

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

        // if (inputIndex === 3 && value.length === 4) {
        //     setDisabled(false);
        // } else {
        //     setDisabled(true);
        // }
    };

    const submitCardNumber = () => {
        const cardNum1 = inputRefs[0].current?.value;
        const cardNum2 = inputRefs[1].current?.value;
        const cardNum3 = inputRefs[2].current?.value;
        const cardNum4 = inputRefs[3].current?.value;
        setCardNumbers({number1: cardNum1, number2: cardNum2, number3: cardNum3, number4: cardNum4});

        const json = JSON.stringify(cardNumbers);

        const encrypted = CryptoJS.AES.encrypt(json, cardSign).toString();
        setCreditCardData({...creditCardData, sign: encrypted});
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
                                type="number"
                                placeholder="● ● ● ●"
                                className="input input-bordered w-full placeholder:text-[0.5rem]"
                                ref={inputRef}
                                onChange={(e) => {
                                    moveNextInput(index, e.target.value);
                                }}
                            />
                        ))}
                    </div>
                    <div className="w-full flex justify-between gap-10 mb-3">
                        <div className="form-control w-full max-w-xs">
                            <label className="label label-text">유효기간</label>
                            <div className="flex gap-3 items-center input input-bordered">
                                <input
                                    {...form.register('expiry-year')}
                                    type="number"
                                    placeholder="년"
                                    className="w-full max-w-xs"
                                />
                                <span className="">/</span>
                                <input
                                    {...form.register('expiry-month')}
                                    type="number"
                                    placeholder="월"
                                    className="w-full max-w-xs"
                                />
                            </div>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label label-text">cvc</label>
                            <input
                                {...form.register('cvc')}
                                type="number"
                                placeholder="000"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                    </div>

                    {/* 법인카드 checkbox */}
                    <label className="label cursor-pointer w-fit">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            {...form.register('isCorporateCard')}
                            onChange={(e) => {
                                e.preventDefault();
                            }}
                        />
                        <span className="label-text font-semibold pl-5">법인 카드</span>
                    </label>
                </div>

                <DefaultButton
                    text="다음"
                    type="button"
                    // disabled={disabled}
                    onClick={() => {
                        submitCardNumber();
                        openInputCardCompanyModal();
                    }}
                />
            </div>
        </Modal>
    );
});
