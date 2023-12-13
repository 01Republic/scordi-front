import React, {memo} from 'react';
import {useSubscriptionsV2} from '^models/Subscription/hook';

export const LoadMoreButton = memo(function LoadMoreButton() {
    const {result, movePage} = useSubscriptionsV2();

    const {totalPage, currentPage} = result.pagination;
    const nextPage = currentPage + 1;

    const position = 'fixed' as 'sticky' | 'fixed';

    return (
        <>
            <div>
                <br />
                <br />
                <br />
                <br />
            </div>
            <div
                className={`w-full flex items-center justify-center ${
                    position === 'sticky' ? `sticky bottom-[1rem] z-10` : ''
                } ${position === 'fixed' ? 'fixed bottom-[5rem] left-0 right-0' : ''}`}
            >
                <button className="btn text-16 shadow-lg" onClick={() => movePage(nextPage, true)}>
                    더 불러오기 ({nextPage}/{totalPage})
                </button>
            </div>
        </>
    );
});
