import {FormatOptionLabelMeta} from 'react-select';
import {Avatar} from '^components/Avatar';
import React, {memo} from 'react';
import {ProductManager} from '^models/Product/manager';
import {ProductOption} from './ProductOption.type';
import {ProductDto} from '^models/Product/type';

interface ProductOptionMenuProps {
    data: ProductOption;
    formatOptionLabel: FormatOptionLabelMeta<ProductOption>;
    product?: ProductDto;
}

export const ProductOptionMenu = memo((props: ProductOptionMenuProps) => {
    const {product} = props;

    return (
        <div className={`!w-auto flex items-center gap-6 btn-like py-2 px-4 no-selectable`}>
            <div>
                <Avatar src={product?.image} draggable={false} className="w-6 ring ring-offset-2" loading="lazy" />
            </div>
            <div className="flex-1">
                <p className="leading-none text-[18px] font-semibold mb-1">{product?.name()}</p>
            </div>
        </div>
    );
});
