import React, {memo, KeyboardEvent} from 'react';
import {FieldValues, UseFieldArrayReturn, UseFormReturn} from 'react-hook-form';
import toast from 'react-hot-toast';
import {IoClose} from 'react-icons/io5';

interface InviteEmailInputProps {
    form: UseFormReturn<FieldValues, any>;
    fieldArray: UseFieldArrayReturn<FieldValues, 'emails', 'id'>;
    confirmOrgMember: () => true | undefined;
}

export const InviteEmailInput = memo((props: InviteEmailInputProps) => {
    const {form, fieldArray, confirmOrgMember} = props;

    // 초대 이메일 배열에 추가하는 함수
    const addInvitedEmail = (e: KeyboardEvent<HTMLInputElement>) => {
        const invitedEmail = e.target.value.trim();

        if (invitedEmail.length === 0) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        const isEmail = invitedEmail.includes('.') && invitedEmail.includes('@');
        const isOrgMember = confirmOrgMember();

        if (!isEmail) {
            toast.error('이메일 형식을 확인해주세요');
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        if (isOrgMember) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        fieldArray.append({email: invitedEmail});
        form.resetField('email');
    };

    const removeInvitedEmail = (index: number) => {
        fieldArray.remove(index);
    };

    return (
        <div className="border w-full min-h-44 rounded-lg py-1 px-3">
            <div className="flex flex-wrap max-h-64 overflow-y-auto">
                {fieldArray.fields.map((field: any, index) => (
                    <span
                        key={field.id}
                        className="m-1 py-1 px-2 rounded-lg bg-scordi-light-200 flex justify-between text-sm"
                    >
                        {field.email}
                        <IoClose
                            size={13}
                            className="self-center ml-2 cursor-pointer"
                            onClick={() => removeInvitedEmail(index)}
                        />
                    </span>
                ))}
            </div>
            <div className="flex gap-2 justify-between">
                <input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    onKeyUp={(e) => e.key === 'Enter' && addInvitedEmail(e)}
                    className="input w-full p-2 focus:outline-none"
                    {...form.register('email')}
                />
            </div>
        </div>
    );
});
