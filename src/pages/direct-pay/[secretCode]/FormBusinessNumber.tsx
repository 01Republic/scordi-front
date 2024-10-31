import React, {memo} from 'react';
import {useFormContext, UseFormRegister} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormBusinessNumberProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormBusinessNumber = memo((props: FormBusinessNumberProps) => {
    const {register} = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length >= 10) {
            e.target.value = value.slice(0, 10);
        }
    };

    return (
        <div className="w-full">
            <label htmlFor="businessNumber" className="flex flex-col gap-2">
                <span>사업자번호 10자리</span>
                <input
                    type="text"
                    {...register('customerIdentityNumber', {
                        required: '사업자번호를 확인해주세요',
                        minLength: {
                            value: 10,
                            message: '사업자번호를 확인해주세요',
                        },
                        onChange: (e) => {
                            handleInputChange(e);
                        },
                    })}
                    className="border w-full h-10 lg:h-11 rounded-lg pl-4"
                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, '');
                    }}
                />
            </label>
        </div>
    );
});
