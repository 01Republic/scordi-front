import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {FieldValues, UseFormReturn} from 'react-hook-form';
import {IoClose} from 'react-icons/io5';
import {invitedEmailsAtom} from '^models/TeamMember';
import {useInviteMember} from './hook';

interface InviteEmailInputProps {
    form: UseFormReturn<FieldValues, any>;
}

export const InviteEmailInput = memo((props: InviteEmailInputProps) => {
    const invitedEmails = useRecoilValue(invitedEmailsAtom);
    const {removeInvitedEmail, addInvitedEmail} = useInviteMember();
    const {form} = props;

    useEffect(() => {
        const emailInput = document.querySelector('input[name=email]') as HTMLElement;
        emailInput.focus();
    });

    return (
        <div className="border w-full min-h-44 rounded-lg py-1 px-3">
            <div className="flex flex-wrap max-h-64 overflow-y-auto">
                {invitedEmails.map((email: string, i) => (
                    <span key={i} className="m-1 py-1 px-2 rounded-lg bg-scordi-light-200 flex justify-between text-sm">
                        {email}
                        <IoClose
                            size={13}
                            className="self-center ml-2 cursor-pointer"
                            onClick={() => removeInvitedEmail(email)}
                        />
                    </span>
                ))}
            </div>
            <div className="flex gap-2 justify-between">
                <input
                    {...form.register('email')}
                    type="email"
                    placeholder="이메일을 입력하세요."
                    onKeyUp={(e) => e.key === 'Enter' && addInvitedEmail(e, form)}
                    className="input w-full p-2 focus:outline-none"
                />
            </div>
        </div>
    );
});
