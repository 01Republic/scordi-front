import React, {memo, useState} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import {currentTeamMemberState, teamMemberApi, TeamMemberDto, useTeamMember} from '^models/TeamMember';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {CgSpinner} from 'react-icons/cg';
import {confirm2} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {useSetRecoilState} from 'recoil';

interface DeleteMemberItemProps {
    reload: () => any;
    teamMember: TeamMemberDto;
}

export const DeleteMemberItem = memo((props: DeleteMemberItemProps) => {
    const setTeamMember = useSetRecoilState(currentTeamMemberState);
    const {reload, teamMember} = props;
    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);
        teamMemberApi
            .destroy(teamMember.organizationId, teamMember.id)
            .then(() => toast.success('구성원을 삭제했어요.'))
            .then(() => reload())
            .then(() => setTeamMember(null))
            .finally(() => setIsLoading(false));
    };

    return (
        <MoreDropdownListItem onClick={() => !isLoading && onClick()}>
            <div className="flex items-center gap-3 w-full text-red-500 py-1">
                {isLoading ? (
                    <CgSpinner size={20} className="animate-spin btn-disabled mx-auto" />
                ) : (
                    <>
                        <FaRegTrashAlt size={12} />
                        <p>멤버 삭제하기</p>
                    </>
                )}
            </div>
        </MoreDropdownListItem>
    );
});
