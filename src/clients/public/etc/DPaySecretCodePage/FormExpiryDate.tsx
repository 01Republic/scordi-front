import React, {memo} from 'react';
import {FieldPath, UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';
import {NumberTextInput} from './TextInput';

interface FormExpiryDateProps extends WithChildren {
    form: UseFormReturn<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormExpiryDate = memo((props: FormExpiryDateProps) => {
    const {
        form: {register, setFocus},
    } = props;

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        nextField: FieldPath<CreateScordiPaymentWithCustomerKeyRequestDto>,
    ) => {
        const value = e.target.value;
        e.target.value = value.slice(0, 2);
        if (value.length >= 2) setFocus(nextField);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <p>
                    <span>유효기간</span>
                    <small className="ml-2">예) 02/27</small>
                </p>
                <section className="grid grid-cols-5 gap-2 mt-2">
                    <label htmlFor="cardExpirationMonth">
                        <NumberTextInput
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
                        />
                    </label>
                    <label htmlFor="cardExpirationYear" className="flex flex-col">
                        <NumberTextInput
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
                        />
                    </label>
                </section>
            </div>
        </div>
    );
});
