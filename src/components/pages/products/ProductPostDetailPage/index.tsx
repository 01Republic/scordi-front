import React, {memo} from 'react';
import {PostDto} from '^types/post.type';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {isPageLoadedAtom, PostDetailPageRoute} from '^pages/posts/[id]';
import {usePost} from '^hooks/usePosts';
import {PageSEO} from '^components/SEO';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {OtherPostList} from '^components/pages/blog/BlogPostDetailPage/OtherPostList';
import {NewsLetterSection} from '^components/pages/LandingPages/components/NewsLetterSection';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';
import {ProductPostContent} from '^components/pages/products/ProductPostDetailPage/ProductPostContent';
import {SaaSReportSection} from '^components/pages/products/ProductPostDetailPage/SaaSReportSection';

export const ProductPostDetailPage = memo(({post}: {post: PostDto}) => {
    const router = useRouter();
    const postId = Number(router.query.id);
    const isLoaded = useRecoilValue(isPageLoadedAtom);
    usePost(post);

    const title = post.prototype?.name ?? post.title;
    const thumbnailUrl = post.prototype?.ogImageUrl ?? post.thumbnailUrl;

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
                                <ProductPostContent />
                            </article>
                        </div>
                    </div>

                    <div className="bg-white pb-[90px]">
                        <div className="blog-container blog-container--default">
                            <div className="blog-container--inner">
                                <h2 className="text-3xl mb-8">More SaaS</h2>
                                <div className="other-posts">
                                    <OtherPostList />
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
