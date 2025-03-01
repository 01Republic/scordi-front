import React, {forwardRef} from 'react';
import {FindAllProductQuery, ProductConnectMethod, ProductDto} from '^models/Product/type';
import {productApi} from '^models/Product/api';
import {Avatar} from '^components/Avatar';
import {AsyncSelect} from './AsyncSelect';

interface SelectProductProps {
    onChange: (productId?: number) => any;
}

type ProductOption = {
    label: JSX.Element;
    value: number;
};

export const SelectProduct = forwardRef((props: SelectProductProps, ref) => {
    const {onChange} = props;

    const search = (params: FindAllProductQuery) => {
        params.where ||= {};
        params.where.connectMethod = {op: 'not', val: ProductConnectMethod.PREPARE};
        return productApi
            .index({...params})
            .then((res) => res.data)
            .then((result) => result.items);
    };

    const toOption = (product: ProductDto): ProductOption => ({
        label: <ProductOption product={product} />,
        value: product.id,
    });

    return (
        <AsyncSelect
            ref={ref}
            placeholder="앱을 선택해주세요"
            loadOptions={(keyword?: string) => {
                return search({keyword}).then((items) => items.map(toOption));
            }}
            onChange={onChange}
        />
    );
});
SelectProduct.displayName = 'SelectProduct';

const ProductOption = ({product}: {product: ProductDto}) => {
    return (
        <div className="px-2 flex items-center gap-2 w-full rounded-lg hover:bg-scordi-50 transition-all cursor-pointer">
            <div>
                <Avatar src={product.image} className="h-[20px] w-[20px]" />
            </div>
            <div className="flex flex-col gap-[1px]">
                <div className="text-10 font-normal text-gray-400 leading-none">#{product.id}</div>
                <div className="text-12 font-normal leading-none whitespace-nowrap overflow-auto no-scrollbar">
                    {product.nameEn}
                </div>
            </div>
        </div>
    );
};
