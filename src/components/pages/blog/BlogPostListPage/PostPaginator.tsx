import React, {memo} from 'react';
import {Paginator} from '^components/Paginator';
import {usePosts} from '^hooks/usePosts';

export const PostPaginator = memo(() => {
    const {result, movePage} = usePosts();
    const {pagination} = result;

    return (
        <Paginator
            className="blog-paginator"
            currentPage={pagination.currentPage}
            totalPage={pagination.totalPage}
            onClick={movePage}
        />
    );
});
