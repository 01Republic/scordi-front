import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {usePost} from '^hooks/usePosts';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';
import {BlogPostDetailHeader} from './BlogPostDetailHeader';
import {BlogPostDetailBody} from './BlogPostDetailBody';
import {OtherPostList} from './OtherPostList';
import {NewsLetterSection} from '^components/pages/LandingPages/components/NewsLetterSection';

export const BlogPostDetailPage = memo(() => {
    const router = useRouter();
    const postId = Number(router.query.id);
    const {getPost} = usePost();

    useEffect(() => {
        if (!router.isReady) return;
        if (!postId || isNaN(postId)) return;
        getPost(postId);
    }, [router.isReady, postId]);

    return (
        <div className="bg-white blog-post-detail">
            <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 z-10 bg-white" />
            <div className="blog-container blog-container--default">
                <div className="blog-container--inner">
                    <article>
                        <BlogPostDetailHeader />
                        <BlogPostDetailBody />
                    </article>
                </div>
            </div>

            <div className="bg-white pb-[90px]">
                <div className="blog-container blog-container--default">
                    <div className="blog-container--inner">
                        <h2 className="text-3xl mb-8">Similar Posts</h2>
                        <div className="other-posts">
                            <OtherPostList />
                        </div>
                    </div>
                </div>
            </div>

            <NewsLetterSection />

            <div className="w-full">
                <div className="blog-container blog-container--default">
                    <div className="blog-container--inner" style={{width: 'calc(92% + 2rem)'}}>
                        <BetaServiceFooter />
                    </div>
                </div>
            </div>
        </div>
    );
});
