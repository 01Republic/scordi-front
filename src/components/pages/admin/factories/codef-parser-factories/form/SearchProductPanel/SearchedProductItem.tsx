import React, {memo} from 'react';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {ProductDto} from '^models/Product/type';

interface SearchedProductItemProps {
    product: ProductDto;
}

export const SearchedProductItem = memo((props: SearchedProductItemProps) => {
    const {product} = props;

    return (
        <div className="mb-1">
            <div className="grid grid-cols-2">
                <div className="flex gap-2 items-center mb-0.5">
                    <span className="badge badge-xs">#{product.id}</span>
                    <span className="text-14 font-semibold">{product.name()}</span>
                    <ProductAvatar size={5} product={product} displayName={false} displayOutline={false} />
                </div>
                <input className="input input-sm w-full !cursor-text" value={product.searchText} disabled />
            </div>
        </div>
    );
});
SearchedProductItem.displayName = 'SearchedProductItem';
