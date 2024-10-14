import React, {memo} from 'react';
import {ProductListHeader} from './ProductListHeader';
import {ProductListSidePanel} from './ProductListSidePanel';
import {ProductListContentPanel} from './ProductListContentPanel';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';

export const ProductListPage = memo(() => {
    return (
        <LandingPageLayout pageName="SaaS-Collection" hideNav hideFooter>
            <br />
            <br />
            <br />
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
