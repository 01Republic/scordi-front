import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {LockKeyhole, Eye, EyeOff, Dot, TriangleAlert} from 'lucide-react';
import cn from 'classnames';
import {CreateUserRequestDto, UserLoginRequestDto} from '^models/User/types';
import {validPasswordRegex} from '^utils/valildation';
import {FormInput} from '^clients/public/userAuth/common/FormInput';

export const NoTokenPasswordSection = memo(() => {
    return (
        <FormInput<CreateUserRequestDto>
            name="password"
            type="password"
            label="비밀번호"
            autoComplete="password"
            showTogglePassword
            icon={
                <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
            }
            validation={{
                required: '비밀번호를 입력해주세요.',
                pattern: {
                    value: validPasswordRegex,
                    message: '8~20자의 영문, 숫자를 사용해 주세요.',
                },
            }}
        />
    );
});
