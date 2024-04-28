import React, {memo} from 'react';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {ProductDto} from '^models/Product/type';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {selectedProductsAtom} from '^clients/private/_modals/SearchAppModal/SelectedProductSection';

interface SearchResultItemProps {
    product: ProductDto;
}

export const SearchResultItem = memo((props: SearchResultItemProps) => {
    const {product} = props;
    const setSelectedProducts = useSetRecoilState(selectedProductsAtom);

    const name =
        product.nameKo === product.nameEn ? (
            product.name()
        ) : (
            <span>
                {product.nameKo} <span className="text-gray-400">({product.nameEn})</span>
            </span>
        );

    const selectProduct = () => {
        setSelectedProducts((arr) => {
            // already exist
            if (arr.find((p) => p.id === product.id)) return arr;

            // push
            return [...arr, product];
        });
    };

    return (
        <div
            className="p-1.5 -mx-1.5 cursor-pointer hover:bg-scordi-50 rounded-md transition-all text-13 flex items-center justify-between btn-animation"
            onClick={() => selectProduct()}
        >
            <div>
                <div className="flex items-center gap-2">
                    <ProductAvatarImg product={product} className="w-5 h-5" />
                    <p className="text-13">{name}</p>
                </div>
            </div>

            <div></div>
        </div>
    );
});
SearchResultItem.displayName = 'SearchResultItem';
