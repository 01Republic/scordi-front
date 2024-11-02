import React, {memo, useEffect} from 'react';
import {FieldErrors, useFormContext, UseFormRegister, UseFormReturn, UseFormWatch} from 'react-hook-form';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';
import {emailValid} from '^utils/input-helper';
import {TextInput} from './TextInput';

interface FormCustomerEmailProps extends WithChildren {
    form: UseFormReturn<CreateScordiPaymentWithCustomerKeyRequestDto, any>;
    errorMessage?: string;
}

export const FormCustomerEmail = memo((props: FormCustomerEmailProps) => {
    const {form, errorMessage} = props;

    return (
        <div className="w-full">
            <label htmlFor="customerEmail" className="flex flex-col gap-2">
                <span>이메일 주소</span>
                <TextInput
                    type="email"
                    {...form.register('customerEmail', {
                        required: '잘못된 이메일 주소입니다.',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '잘못된 이메일 주소입니다.',
                        },
                    })}
                    isInvalid={!!errorMessage}
                    onBlur={() => form.trigger('customerEmail')}
                />
                {errorMessage && <p className="text-red-600 text-right text-12">{errorMessage}</p>}
            </label>
        </div>
    );
});
