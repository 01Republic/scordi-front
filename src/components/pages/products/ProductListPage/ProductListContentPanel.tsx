import {memo, useEffect, useState} from 'react';
import {ProductListContentPanelTitle} from './ProductListContentPanelTitle';
import {ProductListContentPanelSearchInput} from './ProductListContentPanelSearchInput';
import {ProductListContentPanelItem} from './ProductListContentPanelItem';
import {useRecoilValue} from 'recoil';
import {currentProductCategoryAtom} from '^components/pages/products/ProductListPage/ProductListSidePanel';
import {productSearchResultsState, useProductSearch} from '^hooks/useProducts';
import {FindAllProductQuery} from '^types/product.type';

export const ProductListContentPanel = memo(() => {
    const currentCategory = useRecoilValue(currentProductCategoryAtom);
    const products = useRecoilValue(productSearchResultsState);
    const {search} = useProductSearch();

    const [tagName, setTagName] = useState('');

    useEffect(() => {
        const [emoji, ...nameStrings] = currentCategory.split(' ');
        const name = nameStrings.join(' ');
        setTagName(name);
    }, [currentCategory]);

    useEffect(() => {
        if (!tagName) return;
        const query: FindAllProductQuery = tagName === 'All' ? {} : {tagName: tagName};
        query.order = {id: 'DESC'};
        search(query);
    }, [tagName]);

    return (
        <div className="pb-[100px]">
            <div className="flex justify-between items-center mb-[60px]">
                <ProductListContentPanelTitle />
                <ProductListContentPanelSearchInput />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {products.map((product, i) => (
                    <ProductListContentPanelItem key={i} product={product} />
                ))}
            </div>

            <div>
                <p className="text-2xl text-center text-gray-500 py-[80px]">All-in-one SaaS for SaaS 🧑‍💻</p>
            </div>
        </div>
    );
});
