import React, {memo} from 'react';
import {Edit} from 'lucide-react';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {ProductDto} from '^models/Product/type';
import {LinkTo} from '^components/util/LinkTo';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';

interface SearchedProductItemProps {
    product: ProductDto;
    onClick?: () => any;
}

export const SearchedProductItem = memo((props: SearchedProductItemProps) => {
    const {product, onClick} = props;

    return (
        <div className="mb-1">
            <div className="grid grid-cols-2">
                <div className="flex gap-2 items-center mb-0.5">
                    <span className="badge badge-xs">#{product.id}</span>
                    <span
                        className="text-14 font-medium cursor-pointer hover:font-bold transition-all"
                        onClick={onClick}
                    >
                        {product.name()}
                    </span>
                    <ProductAvatar size={5} product={product} displayName={false} displayOutline={false} />
                    <div>
                        <LinkTo href={AdminProductPageRoute.path(product.id)} target="_blank" className="text-12">
                            <Edit className="text-gray-400 hover:text-red-500 transition-all cursor-pointer" />
                        </LinkTo>
                    </div>
                </div>
                <input className="input input-sm w-full !cursor-text" value={product.searchText} disabled />
            </div>
        </div>
    );
});
SearchedProductItem.displayName = 'SearchedProductItem';
