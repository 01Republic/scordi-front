import React, {memo} from 'react';
import {FaCaretDown} from 'react-icons/fa6';
import {useRecoilValue} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember';
import {currentUserAtom} from '^models/User/atom';
import {ApprovalStatus, MembershipLevel} from '^models/Membership/types';
import Tippy from '@tippyjs/react';

interface StatusButtonProps {
    teamMember: TeamMemberDto;
}

export const StatusButton = memo((props: StatusButtonProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {teamMember} = props;

    if (!teamMember || !currentUser) return <></>;

    const {membership} = teamMember;
    const currentUserMembership = currentUser.memberships?.find((m) => m.organizationId === teamMember.organizationId);

    if (!currentUserMembership) return <>!</>;

    if (!membership) {
        return (
            <StatusButtonUI
                className="opacity-50"
                label="비활성"
                caption="아직 워크스페이스에 초대되지 않은 사용자입니다."
            />
        );
    }

    if (membership.approvalStatus === ApprovalStatus.PENDING) {
        return <StatusButtonUI label="대기중" caption="초대 이메일을 보내드렸고, 가입을 기다리고 있어요." />;
    }

    if (membership.level === MembershipLevel.OWNER) {
        return <StatusButtonUI className="!text-gray-700" label="워크스페이스 관리자" />;
    }

    if (membership.level === MembershipLevel.MEMBER) {
        return <StatusButtonUI className="!text-gray-700" label="워크스페이스 구성원" />;
    }

    return <></>;
});
StatusButton.displayName = 'StatusButton';

interface StatusButtonUIProps {
    label: string;
    caption?: string;
    className?: string;
}

const StatusButtonUI = memo((props: StatusButtonUIProps) => {
    const {label, caption, className = ''} = props;

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
                    <FaCaretDown className="relative -top-[1px]" size={10} />
                </div>
            </div>
            {/*{caption && <p className="capitalize text-xs text-gray-400">{caption}</p>}*/}
        </div>
    );
});
