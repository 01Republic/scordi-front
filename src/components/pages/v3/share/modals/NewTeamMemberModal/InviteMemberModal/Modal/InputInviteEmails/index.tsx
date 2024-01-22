import React, {memo, useEffect, useRef} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {IoClose} from 'react-icons/io5';
import {useInviteMember} from './useInviteMember';
import {
    createInviteTeamMemberAtom,
    emailInputValueAtom,
} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal/atom';

export const InputInviteEmails = memo(() => {
    const [inputValue, setInputValue] = useRecoilState(emailInputValueAtom);
    const {removeInvitedEmail, addInvitedEmail} = useInviteMember();
    const formData = useRecoilValue(createInviteTeamMemberAtom);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    });

    return (
        <div className="border w-full min-h-44 rounded-lg py-1 px-3">
            <div className="flex flex-wrap max-h-64 overflow-y-auto">
                {formData.invitations?.map((invitation, i) => (
                    <span key={i} className="m-1 py-1 px-2 rounded-lg bg-scordi-light-200 flex justify-between text-sm">
                        {invitation.email}
                        <IoClose
                            size={13}
                            className="self-center ml-2 cursor-pointer"
                            onClick={() => removeInvitedEmail(invitation.email)}
                        />
                    </span>
                ))}
            </div>
            <div className="flex gap-2 justify-between">
                <input
                    ref={inputRef}
                    type="email"
                    placeholder="이메일을 입력하세요."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && addInvitedEmail(e)}
                    className="input w-full p-2 focus:outline-none"
                />
            </div>
        </div>
    );
});
