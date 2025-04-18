import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember';
import {currentUserAtom} from '^models/User/atom';
import {ApprovalStatus, MembershipLevel, t_membershipLevel} from '^models/Membership/types';
import Tippy from '@tippyjs/react';
import {ChevronDown} from 'lucide-react';

interface StatusButtonProps {
    teamMember: TeamMemberDto;
    caret?: boolean;
}

export const StatusButton = memo((props: StatusButtonProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {teamMember, caret = true} = props;

    if (!teamMember || !currentUser) return <></>;

    const {membership} = teamMember;
    const currentUserMembership = currentUser.memberships?.find((m) => m.organizationId === teamMember.organizationId);

    if (!currentUserMembership) return <>!</>;

    if (!membership) {
        return (
            <StatusButtonUI
                className="opacity-50"
                label="초대 전"
                caption="아직 워크스페이스에 초대되지 않은 사용자입니다."
                caret={caret}
            />
        );
    }

    if (membership.approvalStatus === ApprovalStatus.PENDING) {
        return (
            <StatusButtonUI
                label="가입 대기중"
                caption="초대 이메일을 보내드렸고, 가입을 기다리고 있어요."
                caret={caret}
            />
        );
    }

    if (membership.level === MembershipLevel.OWNER) {
        return (
            <StatusButtonUI
                className="!text-gray-700"
                label={`워크스페이스 ${t_membershipLevel(membership.level)}`}
                caret={caret}
            />
        );
    }

    if (membership.level === MembershipLevel.MEMBER) {
        return (
            <StatusButtonUI
                className="!text-gray-700"
                label={`워크스페이스 ${t_membershipLevel(membership.level)}`}
                caret={caret}
            />
        );
    }

    return <></>;
});
StatusButton.displayName = 'StatusButton';

interface StatusButtonUIProps {
    label: string;
    caption?: string;
    className?: string;
    caret?: boolean;
}

const StatusButtonUI = memo((props: StatusButtonUIProps) => {
    const {label, caption, className = '', caret = true} = props;

    return (
        <div className={`flex flex-col gap-1 group cursor-pointer text-gray-500 ${className}`}>
            <div className="flex justify-end">
                <div className="text-sm group-hover:text-gray-700 flex gap-2 items-center">
                    {caption ? (
                        <Tippy content={caption}>
                            <span>{label}</span>
                        </Tippy>
                    ) : (
                        <span>{label}</span>
                    )}
                    {caret && <ChevronDown className="relative -top-[1px]" size={10} />}
                </div>
            </div>
            {/*{caption && <p className="capitalize text-xs text-gray-400">{caption}</p>}*/}
        </div>
    );
});
