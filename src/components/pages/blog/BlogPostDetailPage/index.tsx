import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {usePost} from '^hooks/usePosts';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';
import {BlogPostDetailHeader} from './BlogPostDetailHeader';
import {BlogPostDetailBody} from './BlogPostDetailBody';
import {OtherPostList} from './OtherPostList';

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
            <LandingPageNavBar showLoginButton={false} fluid={true} className="fixed top-0 z-10" />
            <div className="blog-container blog-container--default">
                <div className="blog-container--inner">
                    <article>
                        <BlogPostDetailHeader />
                        <BlogPostDetailBody />
                    </article>
                </div>
            </div>

            <div className="bg-gray-100 py-[120px]">
                <div className="blog-container blog-container--default">
                    <div className="blog-container--inner">
                        <div className="other-posts">
                            <OtherPostList />
                        </div>
                    </div>
                </div>
            </div>

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
