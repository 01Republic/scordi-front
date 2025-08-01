import React, {memo} from 'react';
import {X} from 'lucide-react';
import {Paginated} from '^types/utils/paginated.dto';
import {LoadableBox} from '^components/util/loading';
import {ProductDto} from '^models/Product/type';
import {SearchedProductItem} from './SearchedProductItem';

interface ProductSelectProps {
    result: Paginated<ProductDto>;
    isLoading: boolean;
    defaultValue?: ProductDto;
    onChange?: (product?: ProductDto) => any;
}

export const ProductSelect = memo((props: ProductSelectProps) => {
    const {result, isLoading, defaultValue: selectedProduct, onChange} = props;

    const selectProduct = (product?: ProductDto) => {
        onChange && onChange(product);
    };

    return (
        <div className="flex-1 pr-4 pt-2">
            {selectedProduct && (
                <div className="flex items-center gap-4 mb-4 text-12">
                    <div className="text-gray-400">선택된 Product :</div>
                    <div className="flex items-center gap-2">
                        <span className="badge badge-xs">#{selectedProduct.id}</span>
                        <div>{selectedProduct.name()}</div>
                    </div>

                    <div>
                        <X
                            size={20}
                            className="text-gray-400 hover:text-black transition-all cursor-pointer"
                            onClick={() => selectProduct(undefined)}
                        />
                    </div>
                </div>
            )}

            {selectedProduct && (
                <div className="">
                    <SearchedProductItem product={selectedProduct} />
                </div>
            )}

            {!selectedProduct && (
                <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                    <div className="text-12 text-gray-400">
                        검색결과: {result.pagination.totalItemCount.toLocaleString()}개
                    </div>
                    {result.items.map((product, i) => (
                        <SearchedProductItem key={i} product={product} onClick={() => selectProduct(product)} />
                    ))}
                </LoadableBox>
            )}
        </div>
    );
});
