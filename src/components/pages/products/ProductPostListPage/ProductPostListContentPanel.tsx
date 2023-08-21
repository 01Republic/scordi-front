import {memo} from 'react';
import {ProductPostListContentPanelTitle} from './ProductPostListContentPanelTitle';
import {ProductPostListContentPanelSearchInput} from './ProductPostListContentPanelSearchInput';
import {ProductPostListContentPanelItem} from './ProductPostListContentPanelItem';

export const ProductPostListContentPanel = memo(() => {
    return (
        <div>
            <div className="flex justify-between items-center mb-[60px]">
                <ProductPostListContentPanelTitle />
                <ProductPostListContentPanelSearchInput />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <ProductPostListContentPanelItem />
                <ProductPostListContentPanelItem />
                <ProductPostListContentPanelItem />
                <ProductPostListContentPanelItem />
                <ProductPostListContentPanelItem />
            </div>

            <div>
                <p className="text-2xl text-center text-gray-500">All-in-one SaaS for SaaS 🧑‍💻</p>
            </div>
        </div>
    );
});
