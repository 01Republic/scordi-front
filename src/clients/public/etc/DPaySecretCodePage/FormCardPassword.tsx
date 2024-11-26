import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {DPayRequestFormDto} from '^models/_scordi/ScordiPayment/type';
import {NumberTextInput} from './TextInput';

interface FormCardPasswordProps extends WithChildren {
    form: UseFormReturn<DPayRequestFormDto, any>;
}

export const FormCardPassword = memo((props: FormCardPasswordProps) => {
    const {
        form: {register, setFocus},
    } = props;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.slice(0, 2);
        if (e.target.value.length >= 2) setFocus('customerIdentityNumber');
    };

    return (
        <div className="w-full">
            <label htmlFor="cardPassword" className="flex flex-col gap-2">
                <span>카드 비밀번호 (앞 2자리) </span>
                <div className="grid grid-cols-5">
                    <NumberTextInput
                        type="password"
                        {...register('cardPassword', {
                            required: '비밀번호를 확인해주세요',
                            minLength: {
                                value: 2,
                                message: '비밀번호를 확인해주세요',
                            },
                            onChange,
                        })}
                    />
                </div>
            </label>
        </div>
    );
});
