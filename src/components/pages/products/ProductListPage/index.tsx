import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {ProductListHeader} from './ProductListHeader';
import {ProductListSidePanel} from './ProductListSidePanel';
import {ProductListContentPanel} from './ProductListContentPanel';

export const ProductListPage = memo(() => {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
    }, [router.isReady]);

    return (
        <div className="bg-white">
            <LandingPageNavBar showLoginButton={true} fluid={true} className="sticky top-0 z-10 bg-white" />
            <ProductListHeader />

            <div className="w-full">
                <div className="blog-container blog-container--default px-4">
                    <div className="sm:grid grid-cols-4 gap-8">
                        <div className="">
                            <ProductListSidePanel />
                        </div>

                        <div className="col-span-3">
                            <ProductListContentPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
