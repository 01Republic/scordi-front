import React, {memo} from 'react';
import {useFormContext, UseFormRegister, UseFormSetFocus} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface FormCardPasswordProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormCardPassword = memo((props: FormCardPasswordProps) => {
    const {register} = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length >= 2) {
            e.target.value = value.slice(0, 2);
        }
    };

    return (
        <div className="w-full">
            <label htmlFor="cardPassword" className="flex flex-col gap-2">
                <span>카드 비밀번호 (앞 2자리) </span>
                <input
                    type="password"
                    {...register('cardPassword', {
                        required: '비밀번호를 확인해주세요',
                        minLength: {
                            value: 2,
                            message: '비밀번호를 확인해주세요',
                        },
                        onChange: (e) => {
                            handleInputChange(e);
                        },
                    })}
                    className="border w-20 h-10 lg:h-11 rounded-lg pl-4"
                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, '');
                    }}
                />
            </label>
        </div>
    );
});
