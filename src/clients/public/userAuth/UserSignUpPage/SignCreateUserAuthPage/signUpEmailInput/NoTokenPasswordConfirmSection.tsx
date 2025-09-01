import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {LockKeyhole, Dot, TriangleAlert} from 'lucide-react';
import cn from 'classnames';
import {CreateUserRequestDto} from '^models/User/types';
import {FormInput} from '^clients/public/userAuth/common/FormInput';
import {validPasswordRegex} from '^utils/valildation';

export const NoTokenPasswordConfirmSection = memo(() => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<CreateUserRequestDto>();
    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('passwordConfirmation', {
        required: '비밀번호를 확인해주세요',
        validate: (value) => {
            if (value !== watch('password')) {
                return '비밀번호가 일치하지 않습니다.';
            }
        },
    });

    const passwordConfirm = watch('passwordConfirmation');

    return (
        <FormInput<CreateUserRequestDto>
            name="passwordConfirmation"
            type="password"
            label="비밀번호 확인"
            autoComplete="passwordConfirmation"
            showTogglePassword
            icon={
                <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
            }
            validation={{
                required: '비밀번호를 확인해주세요',
                validate: (value) => {
                    if (value !== watch('password')) {
                        return '비밀번호가 일치하지 않습니다.';
                    }
                },
            }}
        />
    );
});
