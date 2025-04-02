import React, {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {X} from 'lucide-react';

interface SelectedProductItemProps {
    product: ProductDto;
    unSelect: (product: ProductDto) => any;
}

export const SelectedProductItem = memo((props: SelectedProductItemProps) => {
    const {product, unSelect} = props;

    const name =
        product.nameKo === product.nameEn ? (
            product.name()
        ) : (
            <span>
                {product.nameKo} <span className="text-gray-400">({product.nameEn})</span>
            </span>
        );

    return (
        <div className="p-1.5 -mx-1.5 cursor-pointer hover:bg-scordi-50 rounded-md transition-all text-13 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div
                    className="transition-all text-gray-400 hover:text-gray-500 btn-animation"
                    onClick={() => unSelect(product)}
                >
                    <X size={12} />
                </div>

                <div className="flex items-center gap-2">
                    <ProductAvatarImg product={product} className="w-5 h-5" />
                    <p className="text-13">{name}</p>
                </div>
            </div>

            <div></div>
        </div>
    );
});
SelectedProductItem.displayName = 'SelectedProductItem';
