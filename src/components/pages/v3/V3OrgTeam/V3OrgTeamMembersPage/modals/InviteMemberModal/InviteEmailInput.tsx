import {useToast} from '^hooks/useToast';
import React, {memo, KeyboardEvent, useEffect} from 'react';
import {FieldValues, UseFormReturn} from 'react-hook-form';
import {IoClose} from 'react-icons/io5';
import {useRecoilState} from 'recoil';
import {invitedEmailsAtom} from '^models/TeamMember/atom';

interface InviteEmailInputProps {
    form: UseFormReturn<FieldValues, any>;
    confirmOrgMember: () => boolean | undefined;
}

export const InviteEmailInput = memo((props: InviteEmailInputProps) => {
    const {form, confirmOrgMember} = props;
    const {toast} = useToast();
    const [invitedEmails, setInvitedEmails] = useRecoilState(invitedEmailsAtom);

    useEffect(() => {
        const emailInput = document.querySelector('input[name=email]') as HTMLElement;
        emailInput.focus();
    });

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

        if (!isOrgMember) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        setInvitedEmails([...invitedEmails, invitedEmail]);
        form.resetField('email');
    };

    const removeInvitedEmail = (value: string) => {
        const remainEmails = invitedEmails.filter((email) => {
            return email !== value;
        });

        setInvitedEmails(remainEmails);
    };

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
                    onKeyUp={(e) => e.key === 'Enter' && addInvitedEmail(e)}
                    className="input w-full p-2 focus:outline-none"
                />
            </div>
        </div>
    );
});
