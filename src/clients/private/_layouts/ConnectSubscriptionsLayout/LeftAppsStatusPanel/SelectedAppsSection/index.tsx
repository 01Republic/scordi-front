import {memo} from 'react';
import {useSelectProducts} from '^models/Product/hook';
import {ProductStatus} from './ProductStatus';

export const SelectedAppsSection = memo(function SelectedAppsSection() {
    const {selectedProducts} = useSelectProducts();

    return (
        <div className="flex flex-col items-stretch gap-6">
            {selectedProducts.map((product, i) => (
                <ProductStatus key={i} product={product} />
            ))}
        </div>
    );
});
