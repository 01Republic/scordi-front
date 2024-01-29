import React, {memo, useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {UnSignedAccountFormData} from '^models/Account/types';
import {Input} from './Input';

interface PasswordInputProps {
    form: UseFormReturn<UnSignedAccountFormData, any>;
    isShow: boolean;
    defaultValue?: string;
}

export const PasswordInput = memo((props: PasswordInputProps) => {
    const {form, isShow, defaultValue} = props;
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);

    useEffect(() => {
        setIsPasswordOpen(false);
    }, [isShow]);
    const {} = props;

    return (
        <div className="w-full relative">
            <Input
                type={isPasswordOpen ? 'text' : 'password'}
                label="비밀번호"
                formObj={form}
                name="password"
                autoComplete="off"
                defaultValue={defaultValue}
                required
            />
            <div
                onClick={() => setIsPasswordOpen((s) => !s)}
                className="absolute top-0 right-0 flex items-center no-selectable cursor-pointer text-gray-600 hover:text-black"
            >
                {isPasswordOpen ? '가리기' : '보기'}
            </div>
        </div>
    );
});
