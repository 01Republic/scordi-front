import React, {memo} from 'react';
import {ProductDto} from '^types/product.type';
import {useRecoilValue} from 'recoil';
import {isPageLoadedAtom, PostDetailPageRoute} from '^pages/posts/[id]';
import {PageSEO} from '^components/SEO';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';
import {ProductPostContent} from '^components/pages/products/ProductDetailPage/ProductPostContent';
import {OtherProductList} from '^components/pages/products/ProductDetailPage/OtherProductList';
import {SaaSReportSection} from '^components/pages/products/ProductDetailPage/SaaSReportSection';
import {usePrototypePostContent} from '^hooks/useApplicationPrototypes';

interface ProductDetailPageProps {
    prototype: ProductDto;
}

export const ProductDetailPage = memo((props: ProductDetailPageProps) => {
    const {prototype} = props;
    const isLoaded = useRecoilValue(isPageLoadedAtom);
    const {makeContent} = usePrototypePostContent();
    const [post] = prototype.posts;

    if (!post) return <></>;

    const {title, thumbnailUrl} = makeContent(prototype);

    return (
        <div className="bg-white blog-post-detail">
            <PageSEO
                url={PostDetailPageRoute.path(post.id)}
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
                                <ProductPostContent prototype={prototype} />
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
