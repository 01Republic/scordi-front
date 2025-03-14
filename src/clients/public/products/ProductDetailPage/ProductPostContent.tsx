import React, {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {ProductPostContentTitle} from './ProductPostContentTitle';
import {ShareButton} from './ShareButton';
import {GoListButton} from './GoListButton';

export const ProductPostContent = memo((props: {product: ProductDto}) => {
    const {product} = props;
    const [post] = product.posts;
    if (!post) return <></>;

    const onClick = () => window.open(product.pricingPageUrl);

    return (
        <div className="article-body !pb-[90px]">
            <div className="blog-article-body-styles-of-element">
                <ProductPostContentTitle product={product} />
                <div className="divider"></div>

                <div className="article-content" dangerouslySetInnerHTML={{__html: post.content}} />
                <div className="w-full text-center">
                    <button type="button" className="btn" onClick={onClick}>
                        사용해 보러 가기
                    </button>
                </div>

                <div className="divider" />
            </div>

            <div className="article-share flex flex-row-reverse items-start justify-between">
                <GoListButton />
                <ShareButton product={product} />
            </div>
        </div>
    );
});
