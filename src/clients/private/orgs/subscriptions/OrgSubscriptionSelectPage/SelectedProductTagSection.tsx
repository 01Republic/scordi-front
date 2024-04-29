import {memo} from 'react';
import {useSelectProducts} from '^models/Product/hook';
import {SelectedProductTagItem} from './SelectedProductTagItem';

export const SelectedProductTagSection = memo(function SelectedProductTagSection() {
    const {selectedProducts, unSelect} = useSelectProducts();

    return (
        <div className="flex flex-wrap items-center gap-3 mb-10">
            {selectedProducts.map((product, i) => (
                <SelectedProductTagItem product={product} key={i} unSelect={unSelect} />
            ))}
        </div>
    );
});
