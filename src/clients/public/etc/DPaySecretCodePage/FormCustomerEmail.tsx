import React, {memo} from 'react';
import {FieldErrors, useFormContext, UseFormRegister, UseFormWatch} from 'react-hook-form';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormCustomerEmailProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
    watch: UseFormWatch<CreateScordiPaymentWithCustomerKeyRequestDto>;
    errors: FieldErrors<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormCustomerEmail = memo((props: FormCustomerEmailProps) => {
    const {register, watch, errors} = props;

    const customerEmailValue = watch('customerEmail');

    return (
        <div className="w-full">
            <label htmlFor="customerEmail" className="flex flex-col gap-2">
                <span>이메일 주소</span>
                <input
                    type="email"
                    {...register('customerEmail', {
                        required: '잘못된 이메일 주소입니다.',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '잘못된 이메일 주소입니다.',
                        },
                    })}
                    className={cn('border border-gray-300 hover:border-[#6454FF] w-full h-10 lg:h-11 rounded-lg pl-4', {
                        'border-[#6454FF]': customerEmailValue,
                        'border-red-500': errors.customerEmail,
                    })}
                />
            </label>
        </div>
    );
});
