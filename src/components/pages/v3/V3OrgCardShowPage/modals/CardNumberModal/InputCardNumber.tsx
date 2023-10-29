import React, {ChangeEvent, Dispatch, memo, useEffect} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {UnSignedCreditCardFormData} from '^types/credit-cards.type';
import {currentCreditCardAtom} from '^v3/V3OrgCardShowPage/modals/atom';
import CryptoJS from 'crypto-js';
import {cardSign} from '^config/environments';

interface InputCardNumberProps {
    form: UseFormReturn<UnSignedCreditCardFormData>;
    setDisabled: Dispatch<React.SetStateAction<boolean>>;
}

export const InputCardNumber = memo((props: InputCardNumberProps) => {
    const {form, setDisabled} = props;

    // Detail page 에서 모달 띄울 시 존재함.
    const currentCreditCard = useRecoilValue(currentCreditCardAtom);

    // 만약 수정 중인 경우 form에 기본 값을 세팅합니다.
    useEffect(() => {
        if (!currentCreditCard?.numbers) return;

        const json = CryptoJS.AES.decrypt(currentCreditCard.sign, cardSign).toString(CryptoJS.enc.Utf8);
        const decrypted = JSON.parse(json);

        form.setValue('number1', decrypted.number1);
        form.setValue('number2', decrypted.number2);
        form.setValue('number3', decrypted.number3);
        form.setValue('number4', decrypted.number4);
    }, []);

    useEffect(() => {
        const number1 = document.querySelector('input[name="number1"]') as HTMLInputElement;
        number1.focus();
    }, []);

    const moveNextInput = (currentPart: number, value: string) => {
        if (value.length === 4 && currentPart < 4) {
            const nextPart = currentPart + 1;
            const nextInput = document.querySelector(`input[name="number${nextPart}"]`) as HTMLInputElement;
            if (nextInput) {
                nextInput.focus();
                nextInput.value = '';
            }
        }

        if (value.length === 4 && currentPart === 4) {
            const lastInput = document.querySelector('input[name="number4"]') as HTMLInputElement;
            if (lastInput) {
                lastInput.blur();
            }
        }

        const cardNum1 = form.getValues('number1');
        const cardNum2 = form.getValues('number2');
        const cardNum3 = form.getValues('number3');
        const cardNum4 = form.watch('number4');

        if (!cardNum1 || !cardNum2 || !cardNum3 || !cardNum4) {
            setDisabled(true);
            return;
        }
        setDisabled(false);
    };

    return (
        <div>
            {/* 카드번호 input */}
            <label className="label label-text w-fit">
                카드번호 <span className="text-red-500 pl-1">*</span>
            </label>

            <div className="flex gap-3 mb-3">
                <input
                    {...form.register('number1')}
                    type="text"
                    placeholder="● ● ● ●"
                    pattern="\d*"
                    maxLength={4}
                    className="input input-bordered w-full placeholder:text-[0.5rem]"
                    onChange={(e) => moveNextInput(1, e.target.value)}
                />
                <input
                    {...form.register('number2')}
                    type="text"
                    placeholder="● ● ● ●"
                    pattern="\d*"
                    maxLength={4}
                    className="input input-bordered w-full placeholder:text-[0.5rem]"
                    onChange={(e) => moveNextInput(2, e.target.value)}
                />
                <input
                    {...form.register('number3')}
                    type="text"
                    placeholder="● ● ● ●"
                    pattern="\d*"
                    maxLength={4}
                    className="input input-bordered w-full placeholder:text-[0.5rem]"
                    onChange={(e) => moveNextInput(3, e.target.value)}
                />
                <input
                    {...form.register('number4')}
                    type="text"
                    placeholder="● ● ● ●"
                    pattern="\d*"
                    maxLength={4}
                    className="input input-bordered w-full placeholder:text-[0.5rem]"
                    onChange={(e) => moveNextInput(4, e.target.value)}
                />
            </div>
        </div>
    );
});
