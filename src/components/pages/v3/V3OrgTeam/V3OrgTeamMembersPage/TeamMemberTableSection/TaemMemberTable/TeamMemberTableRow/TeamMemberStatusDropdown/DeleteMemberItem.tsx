import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {Loader, Trash2} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {errorToast} from '^api/api';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {currentTeamMemberState, TeamMemberDto, useDeleteTeamMember} from '^models/TeamMember';
import {confirm2} from '^components/util/dialog';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';

interface DeleteMemberItemProps {
    reload: () => any;
    teamMember: TeamMemberDto;
}

export const DeleteMemberItem = memo((props: DeleteMemberItemProps) => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {reload, teamMember} = props;
    const setTeamMember = useSetRecoilState(currentTeamMemberState);
    const {mutateAsync, isPending} = useDeleteTeamMember();

    const onClick = async () => {
        const {isConfirmed} = await confirm2(
            '구성원을 삭제할까요?',
            <div className="text-16">
                이 작업은 취소할 수 없습니다.
                <br />
                <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                그래도 삭제하시겠어요?
            </div>,
            'warning',
        );
        if (!isConfirmed) return;

        mutateAsync({orgId, id: teamMember.id})
            .then(() => router.replace(OrgTeamMemberListPageRoute.path(orgId)))
            .then(() => toast.success('구성원을 삭제했어요.'))
            .then(() => reload && reload())
            .then(() => setTeamMember(null))
            .catch(errorToast);
    };

    return (
        <MoreDropdownListItem onClick={() => !isPending && onClick()}>
            <div className="flex items-center gap-3 w-full text-red-500 py-1">
                {isPending ? (
                    <Loader size={20} className="animate-spin btn-disabled mx-auto" />
                ) : (
                    <>
                        <Trash2 size={12} />
                        <p>멤버 삭제하기</p>
                    </>
                )}
            </div>
        </MoreDropdownListItem>
    );
});
