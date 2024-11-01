import React, {memo} from 'react';
import {useFormContext, UseFormRegister, UseFormSetFocus} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormBirthDayProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormBirthDay = memo((props: FormBirthDayProps) => {
    const {register} = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length >= 6) {
            e.target.value = value.slice(0, 6);
        }
    };

    return (
        <div className="w-full">
            <label htmlFor="userBirthDay" className="flex flex-col gap-2">
                <span>생년월일 6자리</span>
                <input
                    type="text"
                    {...register('customerIdentityNumber', {
                        required: '생년월일을 확인해주세요',
                        minLength: {
                            value: 6,
                            message: '생년월일을 확인해주세요',
                        },
                        onChange: (e) => {
                            handleInputChange(e);
                        },
                    })}
                    className="border h-10 lg:h-11 rounded-lg pl-4"
                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, '');
                    }}
                />
            </label>
        </div>
    );
});
