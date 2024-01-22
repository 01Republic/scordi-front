import React, {memo} from 'react';
import {useSubscriptionsInTeamMemberShowModal} from '^models/Subscription/hook';

export const LoadMoreButton = memo(() => {
    const {result, movePage} = useSubscriptionsInTeamMemberShowModal();

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
