import React, {memo} from 'react';
import {ProductPostContentTitle} from '^components/pages/products/ProductDetailPage/ProductPostContentTitle';
import {GoListButton} from '^components/pages/products/ProductDetailPage/GoListButton';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {ShareButton} from '^components/pages/products/ProductDetailPage/ShareButton';

export const ProductPostContent = memo((props: {prototype: ApplicationPrototypeDto}) => {
    const {prototype} = props;
    const [post] = prototype.posts;
    if (!post) return <></>;

    return (
        <div className="article-body !pb-[90px]">
            <div className="blog-article-body-styles-of-element">
                <ProductPostContentTitle prototype={prototype} />
                <div className="divider"></div>
                <div className="article-content" dangerouslySetInnerHTML={{__html: post.content}} />
            </div>

            <div className="article-share flex flex-row-reverse items-start justify-between">
                <GoListButton />
                <ShareButton prototype={prototype} />
            </div>
        </div>
    );
});
