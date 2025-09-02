import React, {memo, useState} from 'react';
import {FindAllProductQuery, ProductDto} from '^models/Product/type';
import {useQuery} from '@tanstack/react-query';
import {productApi} from '^models/Product/api';
import {Paginated} from '^types/utils/paginated.dto';
import {ProductProfile} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/GroupedByProductTable/ProductProfile';
import {Check, X} from 'lucide-react';

interface ProductSelectorProps {
    onChange: (product: ProductDto | undefined) => any;
}

export const ProductSelector = (props: ProductSelectorProps) => {
    const {onChange} = props;
    const [selectedProduct, setSelectedProduct] = useState<ProductDto>();
    const [searchParams, setSearchParams] = useState<FindAllProductQuery>({
        keyword: '',
        isLive: true,
        order: {nameEn: 'ASC', nameKo: 'ASC'},
        itemsPerPage: 0,
    });
    const {data, refetch, isFetching} = useQuery({
        queryKey: ['search.products', searchParams],
        queryFn: () => productApi.index(searchParams).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!searchParams.keyword,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const selectProduct = (product: ProductDto | undefined) => {
        setSelectedProduct(product);
        onChange(product);
    };

    return (
        <label className="">
            <div className="font-semibold mb-4">서비스를 선택해주세요.</div>

            <div className="relative">
                <div className="mb-4">
                    <input
                        className="input input-bordered input-sm w-full"
                        type="search"
                        placeholder="Search App (Product)"
                        onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
                        defaultValue={searchParams.keyword}
                    />
                </div>

                <div className="w-full max-h-[30vh] overflow-y-auto">
                    {data.items.map((product) => (
                        <div
                            key={product.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-all flex items-center"
                            onClick={() => selectProduct(selectedProduct?.id === product.id ? undefined : product)}
                        >
                            <div className="flex items-center gap-2">
                                <ProductProfile product={product} />
                            </div>

                            <div className="ml-auto">
                                {selectedProduct?.id === product.id && <Check className="" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </label>
    );
};
