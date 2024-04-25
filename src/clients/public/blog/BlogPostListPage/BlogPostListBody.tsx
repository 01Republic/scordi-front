import React, {memo} from 'react';
import {PostList} from './PostList';
import {PostPaginator} from './PostPaginator';

export const BlogPostListBody = memo(() => {
    return (
        <div className="blog-body">
            <div className="blog-container blog-container--default px-4">
                {/*<div className="blog-container--inner">*/}
                {/*    <PostList />*/}
                {/*    <PostPaginator />*/}
                {/*</div>*/}
                <PostList />
                <PostPaginator />
            </div>
        </div>
    );
});
