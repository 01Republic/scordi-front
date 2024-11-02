import React, {memo} from 'react';
import {FieldErrors, UseFormRegister, UseFormWatch} from 'react-hook-form';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormCustomerPhoneProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
    watch: UseFormWatch<CreateScordiPaymentWithCustomerKeyRequestDto>;
    errors: FieldErrors<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormCustomerPhone = memo((props: FormCustomerPhoneProps) => {
    const {register, watch, errors} = props;

    const customerPhoneValue = watch('customerPhone');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length >= 11) {
            e.target.value = value.slice(0, 11);
        }
    };

    return (
        <div className="w-full">
            <label htmlFor="customerPhone" className="flex flex-col gap-2">
                <span>전화번호 </span>
                <input
                    type="text"
                    placeholder="01012341234"
                    {...register('customerPhone', {
                        required: '전화번호를 입력해주세요.',
                        minLength: {
                            value: 11,
                            message: '전화번호를 다시 확인해주세요',
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: '11자리의 숫자로 입력해주세요',
                        },
                        onChange: (e) => {
                            handleInputChange(e);
                        },
                    })}
                    className={cn('border border-gray-300 hover:border-[#6454FF] w-full h-11 rounded-lg pl-4', {
                        'border-[#6454FF]': customerPhoneValue,
                        'border-red-500': errors.customerPhone,
                    })}
                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, '');
                    }}
                />
            </label>
        </div>
    );
});
