import React, {memo, useEffect} from 'react';
import {FieldValues, UseFormReturn} from 'react-hook-form';
import {creditCardSignAtom} from '../../atom';
import {useRecoilValue} from 'recoil';
import {CreditCardNumber} from '^types/credit-cards.type';

interface InputCardNumberProps {
    form: UseFormReturn<FieldValues, any>;
}

export const InputCardNumber = memo((props: InputCardNumberProps) => {
    const {form} = props;
    const inputFields = ['number1', 'number2', 'number3', 'number4'];
    const cardSignInfo = useRecoilValue(creditCardSignAtom);

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
                {inputFields.map((field, i) => {
                    const key = `number${i + 1}` as keyof CreditCardNumber;
                    return (
                        <input
                            {...form.register(field)}
                            key={i}
                            type="text"
                            placeholder="● ● ● ●"
                            pattern="\d*"
                            maxLength={4}
                            defaultValue={cardSignInfo[key] ?? ''}
                            className="input input-bordered w-full placeholder:text-[0.5rem]"
                            onChange={(e) => moveNextInput(i + 1, e.target.value)}
                        />
                    );
                })}
            </div>
        </div>
    );
});
