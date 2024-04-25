import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {usePosts, useRecentPost} from '^models/Post/hook';
import {NewsLetterSection} from '^clients/public/home/LandingPages/components';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {BlogPostListHeader} from './BlogPostListHeader';
import {BlogPostListBody} from './BlogPostListBody';
import {PostItemRecentType} from './PostItemRecentType';

export const BlogPostListPage = memo(() => {
    const router = useRouter();
    const {search} = usePosts();
    const {data: recentPost, load: fetchRecentPost} = useRecentPost();

    useEffect(() => {
        if (!router.isReady) return;

        fetchRecentPost();
        search({order: {id: 'DESC'}});
    }, [router.isReady]);

    return (
        <LandingPageLayout pageName="Blog">
            <BlogPostListHeader />
            <div className="hidden sm:block blog-body !py-0">
                <div className="blog-container blog-container--default px-4">
                    {recentPost && <PostItemRecentType post={recentPost} />}
                </div>
            </div>
            <BlogPostListBody />

            <NewsLetterSection />

            {/*<div className="w-full">*/}
            {/*    <div className="blog-container blog-container--default">*/}
            {/*        <div className="blog-container--inner" style={{width: 'calc(92% + 2rem)'}}>*/}
            {/*            <BetaServiceFooter />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </LandingPageLayout>
    );
});
