import {memo, useEffect, useRef, useState} from 'react';
import {useProductsInSaaSCollection} from '^models/Product/hook';
import {ProductListContentPanelTitle} from './ProductListContentPanelTitle';
import {ProductListContentPanelSearchInput} from './ProductListContentPanelSearchInput';
import {ProductListContentPanelItem} from './ProductListContentPanelItem';
import {useProductCategoryFeature} from './useProductCategoryFeature';

export const ProductListContentPanel = memo(() => {
    const {currentCategory} = useProductCategoryFeature();
    const {isLoading, result, search, movePage} = useProductsInSaaSCollection();
    const {currentPage, totalPage} = result.pagination;
    const isLastPage = currentPage === totalPage;

    const [tagName, setTagName] = useState('');
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const [emoji, ...nameStrings] = currentCategory.split(' ');
        const name = nameStrings.join(' ').trim();
        setTagName(name);
    }, [currentCategory]);

    useEffect(() => {
        search(tagName === 'All' ? {} : {tagName: tagName});
    }, [tagName]);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && !isLastPage) {
                    movePage(currentPage + 1, true);
                }
            },
            {threshold: 1.0},
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [isLoading, isLastPage, currentPage]);

    return (
        <div className="pb-[100px]">
            <div className="flex justify-between items-center mb-[60px]">
                <ProductListContentPanelTitle />
                <ProductListContentPanelSearchInput />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {result.items.map((product, i) => (
                    <ProductListContentPanelItem key={i} product={product} />
                ))}
            </div>

            {isLoading && (
                <div className="text-center py-[20px]">
                    <p>Loading...</p>
                </div>
            )}

            <div ref={observerRef} className="h-[1px]"></div>

            <div>
                <p className="text-2xl text-center text-gray-500 py-[80px]">All-in-one SaaS for SaaS 🧑‍💻</p>
            </div>
        </div>
    );
});
