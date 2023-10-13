import React, {memo} from 'react';
import {FieldValues, UseFieldArrayReturn, UseFormReturn} from 'react-hook-form';
import {IoClose} from 'react-icons/io5';
import {toast} from 'react-toastify';

interface InviteEmailInputProps {
    form: UseFormReturn<FieldValues, any>;
    fieldArray: UseFieldArrayReturn<FieldValues, 'emails', 'id'>;
}

export const InviteEmailInput = memo((props: InviteEmailInputProps) => {
    const {form, fieldArray} = props;

    const keyDownAddInvitedEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const invitedEmail = e.target.value;
        const isClickEnterKey = e.key === 'Enter';
        const isEmail = invitedEmail.includes('.') && invitedEmail.includes('@');

        if (isClickEnterKey && !isEmail) {
            toast.error('이메일 형식을 확인해주세요');
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        if (isClickEnterKey && isEmail) {
            fieldArray.append({email: invitedEmail});
            form.resetField('email');
        }
    };

    const removeInvitedEmail = (index: number) => {
        fieldArray.remove(index);
    };

    return (
        <form className="border w-full min-h-44 rounded-lg py-1 px-3">
            <div className="flex flex-wrap">
                {fieldArray.fields.map((field, index) => (
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
                    onKeyDown={(e) => keyDownAddInvitedEmail(e)}
                    className="input w-full p-2 focus:outline-none"
                    {...form.register('email')}
                />
            </div>
        </form>
    );
});
