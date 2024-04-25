import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {ProductListHeader} from './ProductListHeader';
import {ProductListSidePanel} from './ProductListSidePanel';
import {ProductListContentPanel} from './ProductListContentPanel';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';

export const ProductListPage = memo(() => {
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
    }, [router.isReady]);

    return (
        <LandingPageLayout pageName="SaaS-Collection">
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
        </LandingPageLayout>
    );
});
