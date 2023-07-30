import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {usePosts} from '^hooks/usePosts';
import {BlogPostListHeader} from './BlogPostListHeader';
import {BlogPostListBody} from './BlogPostListBody';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';
import {LandingPageNavBar} from '^components/lab/landing-page-components';

export const BlogPostListPage = memo(() => {
    const router = useRouter();
    const {search} = usePosts();

    useEffect(() => {
        if (!router.isReady) return;

        search({order: {id: 'DESC'}});
    }, [router.isReady]);

    return (
        <div className="bg-white">
            <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 z-10 bg-white" />
            <BlogPostListHeader />
            <BlogPostListBody />

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
