import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useProductPosts} from '^hooks/usePosts';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {ProductPostListHeader} from '^components/pages/products/ProductPostListPage/ProductPostListHeader';
import {ProductPostListBody} from '^components/pages/products/ProductPostListPage/ProductPostListBody';
import {BetaServiceFooter} from '^components/pages/LandingPages/components';

export const ProductPostListPage = memo(() => {
    const router = useRouter();
    const {search} = useProductPosts();

    useEffect(() => {
        if (!router.isReady) return;

        search({order: {id: 'DESC'}});
    }, [router.isReady]);

    return (
        <div className="bg-white">
            <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 z-10 bg-white" />
            <ProductPostListHeader />
            <ProductPostListBody />

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
