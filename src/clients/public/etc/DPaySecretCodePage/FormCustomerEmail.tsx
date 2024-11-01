import React, {memo} from 'react';
import {FieldErrors, useFormContext, UseFormRegister, UseFormReturn, UseFormWatch} from 'react-hook-form';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';
import {emailValid} from '^utils/input-helper';

interface FormCustomerEmailProps extends WithChildren {
    form: UseFormReturn<CreateScordiPaymentWithCustomerKeyRequestDto, any>;
}

export const FormCustomerEmail = memo((props: FormCustomerEmailProps) => {
    const {form} = props;

    const customerEmailValue = form.watch('customerEmail');

    return (
        <div className="w-full">
            <label htmlFor="customerEmail" className="flex flex-col gap-2">
                <span>이메일 주소</span>
                <input
                    type="email"
                    onChange={(e) => {
                        const input = e.target;
                        form.setValue('customerEmail', input.value);
                    }}
                    onBlur={(e) => {
                        const input = e.target;
                        const isValid = emailValid(input.value);
                        input.setCustomValidity(isValid ? '' : '잘못된 이메일 주소입니다.');
                        input.reportValidity();
                    }}
                    required
                    className={cn('border border-gray-300 hover:border-[#6454FF] w-full h-10 lg:h-11 rounded-lg pl-4', {
                        'border-[#6454FF]': customerEmailValue,
                        'border-red-500': form.formState.errors.customerEmail,
                    })}
                />
            </label>
        </div>
    );
});
