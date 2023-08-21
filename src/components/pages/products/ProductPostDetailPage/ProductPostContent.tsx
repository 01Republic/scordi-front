import React, {memo} from 'react';
import {usePost} from '^hooks/usePosts';
import {ProductPostContentTitle} from '^components/pages/products/ProductPostDetailPage/ProductPostContentTitle';
import {ShareButton} from '^components/pages/blog/BlogPostDetailPage/ShareButton';
import {GoListButton} from '^components/pages/products/ProductPostDetailPage/GoListButton';

export const ProductPostContent = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    return (
        <div className="article-body !pb-[90px]">
            <div className="blog-article-body-styles-of-element">
                <ProductPostContentTitle />
                <div className="divider"></div>
                <div className="article-content" dangerouslySetInnerHTML={{__html: post.content}} />
            </div>

            <div className="article-share flex flex-row-reverse items-start justify-between">
                <ShareButton />
                <GoListButton />
            </div>
        </div>
    );
});
