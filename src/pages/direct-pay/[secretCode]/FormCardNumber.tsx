import React, {memo, useRef} from 'react';
import {FieldErrors, useFormContext, UseFormRegister, UseFormSetFocus, UseFormWatch} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormCardNumberProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
    setFocus: UseFormSetFocus<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormCardNumber = memo((props: FormCardNumberProps) => {
    const {register, setFocus} = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, nextField: string) => {
        const value = e.target.value;

        if (value.length >= 4) {
            e.target.value = value.slice(0, 4);
            setFocus(nextField);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <span>카드번호</span>
                <div className="mt-2 flex gap-2">
                    <label>
                        <input
                            type="text"
                            {...register('cardNumberFirst', {
                                required: '카드번호를 다시 확인해주세요.',
                                minLength: {
                                    value: 4,
                                    message: '카드번호를 다시 확인해주세요',
                                },
                                onChange: (e) => {
                                    handleInputChange(e, 'cardNumberSecond');
                                },
                            })}
                            className="border w-full h-10 lg:h-11 rounded-lg pl-2"
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/[^0-9]/g, '');
                            }}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            {...register('cardNumberSecond', {
                                required: '카드번호를 다시 확인해주세요.',
                                minLength: {
                                    value: 4,
                                    message: '카드번호를 다시 확인해주세요',
                                },
                                onChange: (e) => {
                                    handleInputChange(e, 'cardNumberThird');
                                },
                            })}
                            className="border w-full h-10 lg:h-11 rounded-lg pl-2"
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/[^0-9]/g, '');
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="number"
                            {...register('cardNumberThird', {
                                required: '카드번호를 다시 확인해주세요.',
                                minLength: {
                                    value: 4,
                                    message: '카드번호를 다시 확인해주세요',
                                },
                                onChange: (e) => {
                                    handleInputChange(e, 'cardNumberFourth');
                                },
                            })}
                            className="border w-full h-10 lg:h-11 rounded-lg pl-2"
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/[^0-9]/g, '');
                            }}
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            {...register('cardNumberFourth', {
                                required: '카드번호를 다시 확인해주세요.',
                                minLength: {
                                    value: 4,
                                    message: '카드번호를 다시 확인해주세요',
                                },
                                onChange: (e) => {
                                    handleInputChange(e, 'cardExpirationMonth');
                                },
                            })}
                            className="border w-full h-10 lg:h-11 rounded-lg pl-2"
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/[^0-9]/g, '');
                            }}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
});
