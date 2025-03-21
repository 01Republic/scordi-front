import React, {memo} from 'react';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {ProductDto} from '^models/Product/type';
import {LinkTo} from '^components/util/LinkTo';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {Edit} from 'lucide-react';

interface SearchedProductItemProps {
    product: ProductDto;
    copyToInput: (searchText: string) => any;
}

export const SearchedProductItem = memo((props: SearchedProductItemProps) => {
    const {product, copyToInput} = props;

    const onCopy = () => {
        const searchText = product.searchText.split(' ').slice(0, 3).join(' ');
        copyToInput(searchText);
    };

    return (
        <div className="mb-1">
            <div className="grid grid-cols-2">
                <div className="flex gap-2 items-center mb-0.5">
                    <span className="badge badge-xs">#{product.id}</span>
                    <span className="text-14 font-semibold cursor-pointer" onClick={onCopy}>
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
