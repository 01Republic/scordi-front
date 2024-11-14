import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useProductsInSaaSCollection} from '^models/Product/hook';
import {FindAllProductQuery, ProductDto} from '^models/Product/type';
import {ProductListContentPanelTitle} from './ProductListContentPanelTitle';
import {ProductListContentPanelSearchInput} from './ProductListContentPanelSearchInput';
import {ProductListContentPanelItem} from './ProductListContentPanelItem';
import {useProductCategoryFeature} from './useProductCategoryFeature';

export const ProductListContentPanel = memo(() => {
    const {currentCategory} = useProductCategoryFeature();
    const {result, search: getAllProduct} = useProductsInSaaSCollection();

    const [tagName, setTagName] = useState('');
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const [emoji, ...nameStrings] = currentCategory.split(' ');
        const name = nameStrings.join(' ');
        setTagName(name);
        setPage(1);
        setProducts([]);
        setIsLastPage(false);
    }, [currentCategory]);

    const fetchProducts = useCallback(async () => {
        if (!tagName || isLoading || isLastPage) return;
        setIsLoading(true);

        const query: FindAllProductQuery = tagName === 'All' ? {} : {tagName: tagName};
        const response = await getAllProduct({
            ...query,
            isLive: true,
            itemsPerPage: 15,
            page: page,
            order: {id: 'DESC'},
        });

        if (response) setProducts((prev) => [...prev, ...response.items]);

        if (response && page >= response.pagination?.totalPage) {
            setIsLastPage(true);
        }

        setIsLoading(false);
    }, [tagName, page, isLoading, isLastPage]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
    }, [tagName]);

    useEffect(() => {
        fetchProducts();
    }, [page]);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && !isLastPage) {
                    setPage((prev) => prev + 1);
                }
            },
            {threshold: 1.0},
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [isLoading, isLastPage]);

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
