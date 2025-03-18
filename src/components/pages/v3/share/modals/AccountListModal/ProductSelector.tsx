import React, {memo} from 'react';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {ProductDto} from '^models/Product/type';
import {useAccountProductChangeModal} from '^v3/share/modals/AccountListModal/ProductChangeModal';
import {ChevronDown} from 'lucide-react';

interface ProductSelectorProps {
    product: ProductDto | null;
}

export const ProductSelector = memo((props: ProductSelectorProps) => {
    const {product} = props;
    const {open: openProductChangeModal} = useAccountProductChangeModal();

    return (
        <div className="flex items-center gap-4 cursor-pointer" onClick={openProductChangeModal}>
            <ProductAvatar product={product} />
            <div>
                <ChevronDown />
            </div>
        </div>
    );
});
