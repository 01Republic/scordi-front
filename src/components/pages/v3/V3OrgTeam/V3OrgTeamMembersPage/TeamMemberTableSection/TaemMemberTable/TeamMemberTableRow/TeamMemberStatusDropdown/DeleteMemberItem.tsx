import React, {memo} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import {currentTeamMemberState, TeamMemberDto, useTeamMember} from '^models/TeamMember';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {CgSpinner} from 'react-icons/cg';

interface DeleteMemberItemProps {
    reload: () => any;
    teamMember: TeamMemberDto;
}

export const DeleteMemberItem = memo((props: DeleteMemberItemProps) => {
    const {deleteMember, isLoading} = useTeamMember(currentTeamMemberState);
    const {reload, teamMember} = props;

    return (
        <MoreDropdownListItem onClick={() => !isLoading && deleteMember(reload, teamMember)}>
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
