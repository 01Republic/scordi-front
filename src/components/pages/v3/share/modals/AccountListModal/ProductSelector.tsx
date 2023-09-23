import React, {memo} from 'react';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {AiOutlineCaretDown} from 'react-icons/ai';
import {ProductDto} from '^types/product.type';

interface ProductSelectorProps {
    product: ProductDto;
}

export const ProductSelector = memo((props: ProductSelectorProps) => {
    const {product} = props;

    return (
        <div className="flex items-center gap-4 cursor-pointer">
            <ProductAvatar product={product} />
            <div>
                <AiOutlineCaretDown />
            </div>
        </div>
    );
});
