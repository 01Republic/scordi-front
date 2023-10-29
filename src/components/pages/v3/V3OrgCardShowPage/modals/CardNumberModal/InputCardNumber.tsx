import React, {memo, useEffect} from 'react';
import {FieldValues, UseFormReturn} from 'react-hook-form';
import {creditCardSignAtom} from '../../atom';
import {useRecoilValue} from 'recoil';
import {CreditCardNumber, UnSignedCreditCardFormData} from '^types/credit-cards.type';
import {currentCreditCardAtom} from '^v3/V3OrgCardShowPage/modals/atom';

interface InputCardNumberProps {
    form: UseFormReturn<UnSignedCreditCardFormData>;
}

export const InputCardNumber = memo((props: InputCardNumberProps) => {
    const {form} = props;
    const cardSignInfo = useRecoilValue(creditCardSignAtom);
    // Detail page 에서 모달 띄울 시 존재함.
    const currentCreditCard = useRecoilValue(currentCreditCardAtom);

    // 만약 수정 중인 경우 form에 기본 값을 세팅합니다.
    useEffect(() => {
        if (!currentCreditCard?.numbers) return;
        form.setValue('number1', currentCreditCard.numbers.number1);
        form.setValue('number2', currentCreditCard.numbers.number2);
        form.setValue('number3', currentCreditCard.numbers.number3);
        form.setValue('number4', currentCreditCard.numbers.number4);
    }, [currentCreditCard, form]);

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
