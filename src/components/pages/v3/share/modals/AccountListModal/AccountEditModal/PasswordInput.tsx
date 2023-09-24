import React, {memo, useEffect, useState} from 'react';
import {Input} from '^v3/share/modals/AccountListModal/AccountEditModal/Input';
import {useAccountEditModal} from '^v3/share/modals/AccountListModal/AccountEditModal/atom';
import {UseFormReturn} from 'react-hook-form';
import {UnSignedAccountFormData} from '^types/account.type';

interface PasswordInputProps {
    form: UseFormReturn<UnSignedAccountFormData, any>;
}

export const PasswordInput = memo((props: PasswordInputProps) => {
    const {form} = props;
    const {isShow} = useAccountEditModal();
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
