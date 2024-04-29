import React, {memo} from 'react';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {ProductDto} from '^models/Product/type';
import {AiOutlineMinus} from 'react-icons/ai';
import {useSelectProducts} from '^models/Product/hook';

interface SearchResultItemProps {
    product: ProductDto;
}

export const SearchResultItem = memo((props: SearchResultItemProps) => {
    const {product} = props;
    const {select} = useSelectProducts();

    const name =
        product.nameKo === product.nameEn ? (
            product.name()
        ) : (
            <span>
                {product.nameKo} <span className="text-gray-400">({product.nameEn})</span>
            </span>
        );

    const subscriptionCount = product.subscriptions?.length || 0;

    return (
        <div
            className="p-1.5 -mx-1.5 cursor-pointer hover:bg-scordi-50 rounded-md transition-all text-13 flex items-center justify-between btn-animation"
            onClick={() => select(product)}
        >
            {/* left */}
            <div className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                    <ProductAvatarImg product={product} className="w-5 h-5" />
                    <p className="text-13">{name}</p>
                </div>

                {subscriptionCount > 0 && (
                    <div className="flex items-center gap-1">
                        <AiOutlineMinus className="text-gray-500" />

                        {/*🧩*/}
                        <span className="text-20 relative leading-none mr-1">🏷</span>
                        <span className="text-14 leading-none text-gray-400">
                            {subscriptionCount.toLocaleString()}개의 구독 등록됨
                        </span>
                    </div>
                )}
            </div>

            {/* right */}
            <div></div>
        </div>
    );
});
SearchResultItem.displayName = 'SearchResultItem';
