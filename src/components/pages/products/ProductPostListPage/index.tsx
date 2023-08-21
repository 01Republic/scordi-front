import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useProductPosts} from '^hooks/usePosts';
import {LandingPageNavBar} from '^components/lab/landing-page-components';

export const ProductPostListPage = memo(() => {
    const router = useRouter();
    const {search} = useProductPosts();

    useEffect(() => {
        if (!router.isReady) return;
    });
    return (
        <div className="bg-white">
            <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 z-10 bg-white" />

            <div className="w-full">
                <div className="blog-container blog-container--default">
                    <div className="blog-container--inner" style={{width: 'calc(92% + 2rem)'}}>
                        <h1>ProductListPage</h1>
                    </div>
                </div>
            </div>
        </div>
    );
});
