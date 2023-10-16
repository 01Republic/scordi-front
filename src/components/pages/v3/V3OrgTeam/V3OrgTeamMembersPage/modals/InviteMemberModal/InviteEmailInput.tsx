import React, {memo, useEffect} from 'react';
import {useMemberships} from '^hooks/useMemberships';
import {FieldValues, UseFieldArrayReturn, UseFormReturn} from 'react-hook-form';
import {IoClose} from 'react-icons/io5';
import {toast} from 'react-toastify';

interface InviteEmailInputProps {
    form: UseFormReturn<FieldValues, any>;
    fieldArray: UseFieldArrayReturn<FieldValues, 'emails', 'id'>;
}

export const InviteEmailInput = memo((props: InviteEmailInputProps) => {
    const {form, fieldArray} = props;
    const {membershipSearchResult, searchMemberships} = useMemberships();

    useEffect(() => {
        searchMemberships({where: {organizationId: 36}, order: {id: 'DESC'}});
    }, []);

    // 이미 조직에 등록된 멤버인지 확인하는 함수
    const confirmOrgMember = () => {
        const invitedEmail = form.getValues('email');

        const orgMemberEmails = membershipSearchResult.items.filter((item) => {
            return item.invitedEmail === invitedEmail;
        });

        if (orgMemberEmails.length === 0) return;

        const orgMemberEmail = orgMemberEmails[0].approvalStatus;

        if (orgMemberEmail === 'PENDING') {
            toast.error('승인 대기 중인 멤버입니다.');
            return true;
        }

        if (orgMemberEmail === 'APPROVED') {
            toast.error('이미 등록된 멤버입니다.');
            return true;
        }
    };

    // 초대 이메일 보내는 함수
    const addInvitedEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const invitedEmail = e.target.value;
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
        <form className="border w-full min-h-44 rounded-lg py-1 px-3">
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
                    onKeyDown={(e) => e.key === 'Enter' && addInvitedEmail(e)}
                    className="input w-full p-2 focus:outline-none"
                    {...form.register('email')}
                />
            </div>
        </form>
    );
});
