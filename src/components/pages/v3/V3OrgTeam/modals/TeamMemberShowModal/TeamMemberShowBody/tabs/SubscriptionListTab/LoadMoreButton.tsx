import React, {memo} from 'react';
import {useSubscriptionsV3} from '^models/Subscription/hook';
import {
    pagedSubscriptionForTeamMemberShowModalState as resultAtom,
    subscriptionQueryForTeamMemberShowModalState as queryAtom,
} from './atom';

export const LoadMoreButton = memo(() => {
    const {result, movePage} = useSubscriptionsV3(resultAtom, queryAtom, true);

    const {totalPage, currentPage} = result.pagination;
    const nextPage = currentPage + 1;

    return (
        <div className="w-full flex items-center justify-center sticky bottom-[1rem]">
            <button className="btn text-16 shadow-lg" onClick={() => movePage(nextPage)}>
                더 불러오기 ({nextPage}/{totalPage})
            </button>
        </div>
    );
});
LoadMoreButton.displayName = 'LoadMore';
