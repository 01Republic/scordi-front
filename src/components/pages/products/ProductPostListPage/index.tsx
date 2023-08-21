import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useProductPosts} from '^hooks/usePosts';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {ProductPostListHeader} from '^components/pages/products/ProductPostListPage/ProductPostListHeader';
import {ProductPostListSidePanel} from '^components/pages/products/ProductPostListPage/ProductPostListSidePanel';
import {ProductPostListContentPanel} from '^components/pages/products/ProductPostListPage/ProductPostListContentPanel';

export const ProductPostListPage = memo(() => {
    const router = useRouter();
    const {search} = useProductPosts();

    useEffect(() => {
        if (!router.isReady) return;
    }, [router.isReady]);

    return (
        <div className="bg-white">
            <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 z-10 bg-white" />
            <ProductPostListHeader />

            <div className="w-full">
                <div className="blog-container blog-container--default">
                    <div className="grid grid-cols-4 gap-8">
                        <div className="">
                            <ProductPostListSidePanel />
                        </div>

                        <div className="col-span-3">
                            <ProductPostListContentPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
