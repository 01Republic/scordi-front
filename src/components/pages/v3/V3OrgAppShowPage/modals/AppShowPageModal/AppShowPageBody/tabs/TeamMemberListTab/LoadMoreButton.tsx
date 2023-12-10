import React, {memo} from 'react';
import {useTeamMembersV3} from '^models/TeamMember';
import {teamMemberListAtom} from './atom';

export const LoadMoreButton = memo(() => {
    const {result, movePage} = useTeamMembersV3(teamMemberListAtom.result, teamMemberListAtom.query);

    const {totalPage, currentPage} = result.pagination;
    const nextPage = currentPage + 1;

    return (
        <div className="w-full flex items-center justify-center sticky bottom-[1rem]">
            <button className="btn text-16 shadow-lg" onClick={() => movePage(nextPage, true)}>
                더 불러오기 ({nextPage}/{totalPage})
            </button>
        </div>
    );
});
LoadMoreButton.displayName = 'LoadMore';
