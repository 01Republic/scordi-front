import React, {memo} from 'react';
import {Pencil} from 'lucide-react';
import {CreateUserRequestDto} from '^models/User/types';
import {FormInput} from '^clients/public/userAuth/common/FormInput';

export const NoTokenNameSection = memo(() => {
    return (
        <FormInput<CreateUserRequestDto>
            name="name"
            type="text"
            label="이름"
            autoComplete="name"
            icon={<Pencil className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />}
            validation={{
                required: '이름을 입력해주세요.',
            }}
        />
    );
});
