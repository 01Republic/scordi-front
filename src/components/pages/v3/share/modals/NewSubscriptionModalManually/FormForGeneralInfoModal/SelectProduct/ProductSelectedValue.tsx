import React, {memo} from 'react';
import {ProductManager} from '^models/Product/manager';
import {ProductOption} from '^v3/share/modals/AccountListModal/form/SelectProduct/ProductOption.type';
import {FormatOptionLabelMeta} from 'react-select';
import {Avatar} from '^components/Avatar';
import {ProductDto} from '^models/Product/type';

interface ProductSelectedValueProps {
    data: ProductOption;
    formatOptionLabel: FormatOptionLabelMeta<ProductOption>;
    product?: ProductDto;
}

export const ProductSelectedValue = memo((props: ProductSelectedValueProps) => {
    const {product} = props;

    return (
        <div className={`!w-auto flex items-center gap-6 btn-like py-2 no-selectable`}>
            <p className="leading-none text-[18px] font-semibold">{product?.name()}</p>
            <Avatar
                src={product?.image}
                draggable={false}
                className="w-5 ring-1 ring-offset-1 top-[-1px]"
                loading="lazy"
            />
        </div>
    );
});
