import React, {memo} from 'react';
import {UseFormRegister} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';
import {NumberTextInput} from './TextInput';

interface FormBirthDayProps extends WithChildren {
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const FormBirthDay = memo((props: FormBirthDayProps) => {
    const {register} = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        e.target.value = value.slice(0, 6);
    };

    return (
        <div className="w-full">
            <label htmlFor="userBirthDay" className="flex flex-col gap-2">
                <span>생년월일 6자리</span>
                <NumberTextInput
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
                />
            </label>
        </div>
    );
});
