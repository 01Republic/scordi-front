import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {productSearchResultsState, useProductSearch} from '^hooks/useProducts';
import {OtherProductItem as ProductItem} from '^components/pages/products/ProductDetailPage/OtherProductItem';

export const OtherProductList = memo(() => {
    const router = useRouter();
    const {search} = useProductSearch();
    const [pageNum, setPageNum] = useState(1);

    const products = useRecoilValue(productSearchResultsState);

    useEffect(() => {
        if (!router.isReady) return;

        search({order: {id: 'DESC'}, itemsPerPage: 3, page: pageNum});
    }, [router.isReady, pageNum]);

    return (
        <ul className="other-posts-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product, i) => (
                <ProductItem product={product} key={i} />
            ))}
        </ul>
    );
});
