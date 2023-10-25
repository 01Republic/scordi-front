import React, {memo, useEffect, useState} from 'react';
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
import {InputCardNumber} from './InputCardNumber';

export const CardNumberModal = memo(() => {
    const {Modal, close, isShow} = useModal(inputCardNumberModal);
    const {open: openInputCardCompanyModal} = useModal(selectCardCompanyModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const [cardNumbers, setCardNumbers] = useState<CreditCardSecretInfo>({});
    const form = useForm();
    const {toast} = useToast();

    useEffect(() => {
        if (!isShow) {
            form.reset();
        }
    }, [isShow]);

    const checkCardInfomations = () => {
        const cardNum1 = form.watch('number1');
        const cardNum2 = form.watch('number2');
        const cardNum3 = form.watch('number3');
        const cardNum4 = form.watch('number4');

        if (!cardNum1 && !cardNum2 && !cardNum3 && !cardNum4) {
            toast.error('카드 번호를 확인해주세요');
            return false;
        }
        const formData = form.watch();

        setCardNumbers(formData);
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

        // TODO: 법인카드 체크 오류 수정
        // const isCorporateCard = form.watch('isCorporateCard');
        // const isPersonal = !isCorporateCard;

        // setCreditCardData({...creditCardData, isPersonal: isPersonal});
        openInputCardCompanyModal();
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <form className="px-5 ">
                <div className="py-5 pt-20">
                    <p className="mb-4">새로운 카드 등록하기</p>
                    <h2 className="h1 leading-tight">카드 번호를 입력해주세요</h2>
                </div>

                <InputCardNumber form={form} />
                <AddOptionalData form={form} />

                <div className="mt-10">
                    <DefaultButton text="다음" type="button" onClick={submitCardInfomations} />
                </div>
            </form>
        </Modal>
    );
});
