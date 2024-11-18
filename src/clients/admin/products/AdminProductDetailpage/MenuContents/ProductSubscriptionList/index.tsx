import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {adminProductDetail} from '^admin/products/AdminProductDetailpage';

export const ProductSubscriptionList = memo(function ProductSubscriptionList() {
    const product = useRecoilValue(adminProductDetail);

    useEffect(() => {}, [product?.id]);

    return (
        <div>
            <div>ProductSubscriptionList</div>
        </div>
    );
});
