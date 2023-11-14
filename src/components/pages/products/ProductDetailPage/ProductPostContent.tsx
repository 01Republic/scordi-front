import React, {memo} from 'react';
import {ProductPostContentTitle} from '^components/pages/products/ProductDetailPage/ProductPostContentTitle';
import {ProductDto} from '^models/Product/type';
import {ShareButton} from '^components/pages/products/ProductDetailPage/ShareButton';
import {GoListButton} from '^components/pages/products/ProductDetailPage/GoListButton';

export const ProductPostContent = memo((props: {product: ProductDto}) => {
    const {product} = props;
    const [post] = product.posts;
    if (!post) return <></>;

    return (
        <div className="article-body !pb-[90px]">
            <div className="blog-article-body-styles-of-element">
                <ProductPostContentTitle product={product} />
                <div className="divider"></div>
                <div className="article-content" dangerouslySetInnerHTML={{__html: post.content}} />
            </div>

            <div className="article-share flex flex-row-reverse items-start justify-between">
                <GoListButton />
                <ShareButton product={product} />
            </div>
        </div>
    );
});
