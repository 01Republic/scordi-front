import React, {memo} from 'react';
import {FieldErrors, useFormContext, UseFormRegister, UseFormSetFocus, UseFormWatch} from 'react-hook-form';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormCustomerNameProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
    watch: UseFormWatch<CreateScordiPaymentWithCustomerKeyRequestDto>;
    errors: FieldErrors<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormCustomerName = memo((props: FormCustomerNameProps) => {
    const {register, watch, errors} = props;

    const customerNameValue = watch('customerName');

    return (
        <div className="w-full">
            <label htmlFor="customerName" className="flex flex-col gap-2">
                <span>이름</span>
                <input
                    type="text"
                    {...register('customerName', {
                        required: '이름을 입력해주세요',
                    })}
                    className={cn('border border-gray-300 hover:border-[#6454FF] w-full h-11 rounded-lg pl-4 ', {
                        'border-[#6454FF]': customerNameValue,
                        'border-red-500': errors.customerName,
                    })}
                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[0-9]/g, '');
                    }}
                />
            </label>
        </div>
    );
});
