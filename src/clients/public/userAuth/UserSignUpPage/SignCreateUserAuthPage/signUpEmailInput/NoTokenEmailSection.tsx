import React, {memo} from 'react';
import {Mail} from 'lucide-react';
import {CreateUserRequestDto} from '^models/User/types';
import {validateEmailRegex} from '^utils/valildation';
import {FormInput} from '^clients/public/userAuth/common/FormInput';

export const NoTokenEmailSection = memo(() => {
    return (
        <FormInput<CreateUserRequestDto>
            name="email"
            type="text"
            label="이메일"
            autoComplete="email"
            icon={<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />}
            validation={{
                required: '이메일을 입력해주세요.',
                pattern: {
                    value: validateEmailRegex,
                    message: '유효한 이메일 형식이 아닙니다.',
                },
            }}
        />
    );
});
