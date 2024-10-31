import React, {memo} from 'react';
import {useFormContext, UseFormRegister, UseFormSetFocus} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormExpiryDateProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
    setFocus: UseFormSetFocus<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormExpiryDate = memo((props: FormExpiryDateProps) => {
    const {register, setFocus} = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, nextField: string) => {
        const value = e.target.value;

        if (value.length >= 2) {
            e.target.value = value.slice(0, 2);
            setFocus(nextField);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <span>유효기간 </span>
                <section className="flex gap-2 mt-2">
                    <label htmlFor="cardExpirationMonth">
                        <input
                            type="text"
                            placeholder="MM"
                            {...register('cardExpirationMonth', {
                                required: '유효 월을 다시 확인해주세요',
                                minLength: {
                                    value: 2,
                                    message: '유효 월을 다시 확인해주세요',
                                },
                                onChange: (e) => {
                                    handleInputChange(e, 'cardExpirationYear');
                                },
                            })}
                            className="border w-20 h-10 lg:h-11 rounded-lg pl-4"
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/[^0-9]/g, '');
                            }}
                        />
                    </label>
                    <label htmlFor="cardExpirationYear" className="flex flex-col">
                        <input
                            type="text"
                            placeholder="YY"
                            {...register('cardExpirationYear', {
                                required: '유효 년을 다시 확인해주세요',
                                minLength: {
                                    value: 2,
                                    message: '유효 년을 다시 확인해주세요',
                                },
                                onChange: (e) => {
                                    handleInputChange(e, 'cardPassword');
                                },
                            })}
                            className="border w-20 h-10 lg:h-11 rounded-lg pl-4"
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/[^0-9]/g, '');
                            }}
                        />
                    </label>
                </section>
            </div>
        </div>
    );
});
