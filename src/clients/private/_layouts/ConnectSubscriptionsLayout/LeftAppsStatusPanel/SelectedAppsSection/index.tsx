import {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {confirm2} from '^components/util/dialog';
import {useCurrentConnectingProduct} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/useCurrentConnectingProduct';
import {ProductStatus} from './ProductStatus';
import {useSelectProducts} from '^models/Product/hook';

export const SelectedAppsSection = memo(function SelectedAppsSection() {
    const {selectedProducts, selectedWithFinishedProducts} = useSelectProducts();
    const {currentConnectingProduct, setCurrentConnectingProduct} = useCurrentConnectingProduct();

    const onClick = (product: ProductDto) => {
        confirm2(
            '잠시만요!',
            '이 페이지를 벗어나면 데이터를 잃어버릴 수 있어요!\n그래도 계속 진행 할까요?',
            'warning',
        ).then((res) => {
            if (res.isConfirmed) {
                setCurrentConnectingProduct(product);
            }
        });
    };

    return (
        <div className="flex flex-col items-stretch gap-6">
            {selectedWithFinishedProducts.map((product, i) => (
                <ProductStatus
                    key={i}
                    product={product}
                    current={currentConnectingProduct?.id === product.id}
                    onClick={onClick}
                    finished={!selectedProducts.some((p) => p.id === product.id)}
                />
            ))}
        </div>
    );
});
