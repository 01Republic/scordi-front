import React, {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {Squircle} from '^components/ui/Squircle';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {useSelectProducts} from '^models/Product/hook';

interface SelectableProductItemProps {
    product: ProductDto;
}

export const SelectableProductItem = memo((props: SelectableProductItemProps) => {
    const {product} = props;
    const {selectedProducts, toggle} = useSelectProducts();
    const isActive = !!selectedProducts.find((p) => p.id === product.id);

    return (
        <div className="flex items-center justify-center">
            <Squircle className={isActive ? 'selected' : ''} text={product.name()} onClick={() => toggle(product)}>
                <ProductAvatarImg product={product} className="w-8 h-8" />
            </Squircle>
        </div>
    );
});
SelectableProductItem.displayName = 'SelectableProductItem';
