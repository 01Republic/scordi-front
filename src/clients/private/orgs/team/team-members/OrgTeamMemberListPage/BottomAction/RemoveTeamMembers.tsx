import React, {memo} from 'react';
import {useRouter} from 'next/router';
import Tippy from '@tippyjs/react';
import {Trash2} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {allSettled} from '^utils/array';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {TeamMemberDto, useDeleteTeamMember} from '^models/TeamMember';
import {ApprovalStatus, MembershipLevel} from '^models/Membership/types';
import {confirmed} from '^components/util/dialog';
import {confirm3} from '^components/util/dialog/confirm3';

interface RemoveTeamMembersProps {
    checkedItems: TeamMemberDto[];
    onClear: () => void;
}

export const RemoveTeamMembers = memo((props: RemoveTeamMembersProps) => {
    const {checkedItems, onClear} = props;
    const orgId = useOrgIdParam();
    const router = useRouter();

    const {mutateAsync: deleteTeamMember, isPending} = useDeleteTeamMember();

    const isMemberOrOwner = (temMember: {membership?: {level?: MembershipLevel; approvalStatus?: ApprovalStatus}}) =>
        temMember.membership?.level === MembershipLevel.OWNER ||
        (temMember.membership &&
            temMember.membership.level === MembershipLevel.MEMBER &&
            temMember.membership.approvalStatus === ApprovalStatus.APPROVED);

    const eachRemove = checkedItems.some(isMemberOrOwner);

    const onRemoveTeamMember = async () => {
        const removeConfirm = () => {
            return confirm3(
                '선택한 모든 구성원을 삭제할까요?',
                <div className="text-16">
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </div>,
                'warning',
            );
        };

        return (
            confirmed(removeConfirm())
                .then(() => {
                    const fetch = checkedItems.map((item) =>
                        deleteTeamMember({
                            orgId,
                            id: item.id,
                        }),
                    );
                    return allSettled(fetch);
                })
                // .then(() => router.replace(OrgTeamMemberListPageRoute.path(orgId)))
                .then(() => toast.success('구성원을 삭제했어요.'))
                .then(() => onClear())
                .catch(errorToast)
        );
    };

    return (
        <>
            {eachRemove ? (
                <Tippy content="구성원은 개별 삭제가 필요합니다.">
                    <div className="flex gap-1 text-gray-400 bg-gray-200 btn btn-sm no-animation btn-animation hover:!bg-gray-150">
                        <Trash2 />
                        삭제하기
                    </div>
                </Tippy>
            ) : (
                <button
                    className={`flex gap-1 btn btn-sm no-animation btn-animation btn-white !text-red-400 ${
                        !eachRemove && isPending ? 'link_to-loading' : ''
                    }`}
                    onClick={onRemoveTeamMember}
                >
                    <Trash2 />
                    삭제하기
                </button>
            )}
        </>
    );
});
