import {memo, useEffect, useState} from 'react';
import {ProductListContentPanelTitle} from './ProductListContentPanelTitle';
import {ProductListContentPanelSearchInput} from './ProductListContentPanelSearchInput';
import {ProductListContentPanelItem} from './ProductListContentPanelItem';
import {useRecoilValue} from 'recoil';
import {currentProductCategoryAtom} from '^components/pages/products/ProductListPage/ProductListSidePanel';
import {prototypeSearchResultsState, usePrototypeSearch} from '^hooks/useApplicationPrototypes';

export const ProductListContentPanel = memo(() => {
    const currentCategory = useRecoilValue(currentProductCategoryAtom);
    const prototypes = useRecoilValue(prototypeSearchResultsState);
    const {search} = usePrototypeSearch();

    const [tagName, setTagName] = useState('');

    useEffect(() => {
        const [emoji, ...nameStrings] = currentCategory.split(' ');
        const name = nameStrings.join(' ');
        setTagName(name);
    });

    useEffect(() => {
        const query = tagName === 'All' ? {} : {tagName: tagName};

        search(query);
    }, [tagName]);

    return (
        <div>
            <div className="flex justify-between items-center mb-[60px]">
                <ProductListContentPanelTitle title={currentCategory} />
                <ProductListContentPanelSearchInput />
            </div>

            <div className="grid grid-cols-3 gap-3">
                {prototypes.map((prototype) => (
                    <ProductListContentPanelItem prototype={prototype} />
                ))}
            </div>

            <div>
                <p className="text-2xl text-center text-gray-500">All-in-one SaaS for SaaS 🧑‍💻</p>
            </div>
        </div>
    );
});
