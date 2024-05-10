import {memo} from 'react';
import {useSelectProducts} from '^models/Product/hook';
import {ProductStatus} from './ProductStatus';
import {useCurrentConnectingProduct} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/useCurrentConnectingProduct';

export const SelectedAppsSection = memo(function SelectedAppsSection() {
    const {selectedProducts} = useSelectProducts();
    const {currentConnectingProduct, setCurrentConnectingProduct} = useCurrentConnectingProduct();

    return (
        <div className="flex flex-col items-stretch gap-6">
            {selectedProducts.map((product, i) => (
                <ProductStatus
                    key={i}
                    product={product}
                    current={currentConnectingProduct?.id === product.id}
                    onClick={setCurrentConnectingProduct}
                />
            ))}
        </div>
    );
});
