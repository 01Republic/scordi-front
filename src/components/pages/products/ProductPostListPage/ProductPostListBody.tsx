import {memo} from 'react';
import {ProductPostCategoryBar} from '^components/pages/products/ProductPostListPage/ProductPostCategoryBar';
import {ProductPostItems} from '^components/pages/products/ProductPostListPage/ProductPostItems';

export const ProductPostListBody = memo(() => {
    return (
        <div className="blog-container blog-container--default pt-[80px]">
            <div className="grid grid-cols-4 gap-4 gap-x-4">
                <div className="col-span-1">
                    <ProductPostCategoryBar />
                </div>
                <div className="col-span-3">
                    <ProductPostItems />
                </div>
            </div>
        </div>
    );
});
