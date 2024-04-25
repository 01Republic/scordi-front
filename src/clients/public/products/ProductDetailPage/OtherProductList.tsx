import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useAnotherProductsForSaaSCollection} from '^models/Product/hook';
import {OtherProductItem as ProductItem} from './OtherProductItem';

export const OtherProductList = memo(() => {
    const router = useRouter();
    const {result, search} = useAnotherProductsForSaaSCollection();
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        if (!router.isReady) return;

        search({order: {id: 'DESC'}, itemsPerPage: 3, page: pageNum});
    }, [router.isReady, pageNum]);

    return (
        <ul className="other-posts-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {result.items.map((product, i) => (
                <ProductItem product={product} key={i} />
            ))}
        </ul>
    );
});
