import React, {memo} from 'react';
import {ProductDto} from '^types/product.type';
import {useRecoilValue} from 'recoil';

import {PageSEO} from '^components/SEO';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';
import {ProductPostContent} from '^components/pages/products/ProductDetailPage/ProductPostContent';
import {OtherProductList} from '^components/pages/products/ProductDetailPage/OtherProductList';
import {SaaSReportSection} from '^components/pages/products/ProductDetailPage/SaaSReportSection';
import {useProductPostContent} from '^hooks/useProducts';
import {isProductDetailPageLoadedAtom, ProductDetailPageRoute} from '^pages/products/[id]';

interface ProductDetailPageProps {
    product: ProductDto;
}

export const ProductDetailPage = memo((props: ProductDetailPageProps) => {
    const {product} = props;
    const [post] = product.posts;

    if (!post) return <></>;

    const isLoaded = useRecoilValue(isProductDetailPageLoadedAtom);

    const {makeContent} = useProductPostContent();
    const {title, thumbnailUrl} = makeContent(product);

    return (
        <div className="bg-white blog-post-detail">
            <PageSEO
                url={ProductDetailPageRoute.path(post.id)}
                title={`${title} | scordi blog`}
                description={post.seoDescription}
                author={post.authors[0]?.name}
                keywords={(post.seoKeywords || []).join(', ')}
                thumbnail={thumbnailUrl!}
            />

            {isLoaded && (
                <>
                    <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 z-10 bg-white" />
                    <div className="blog-container blog-container--default">
                        <div className="blog-container--inner">
                            <article>
                                <ProductPostContent product={product} />
                            </article>
                        </div>
                    </div>

                    <div className="bg-white pb-[90px]">
                        <div className="blog-container blog-container--default">
                            <div className="blog-container--inner">
                                <h2 className="text-3xl mb-8">More SaaS</h2>
                                <div className="other-posts">
                                    <OtherProductList />
                                </div>
                            </div>
                        </div>
                    </div>

                    <SaaSReportSection />

                    <div className="w-full">
                        <div className="blog-container blog-container--default">
                            <div className="blog-container--inner" style={{width: 'calc(92% + 2rem)'}}>
                                <BetaServiceFooter />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});
