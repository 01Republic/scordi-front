import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {ProductDto} from '^types/product.type';

interface ProductAvatarProps {
    product: ProductDto | null;
    size?: number;
    wrapperClass?: string;
}

export const ProductAvatar = memo((props: ProductAvatarProps) => {
    const {product, size = 8, wrapperClass = ''} = props;

    return (
        <div className="flex items-center space-x-4">
            <Avatar
                src={product?.image}
                className={`w-${size} h-${size} ring ring-gray-200 ring-offset-base-100 ring-offset-4`}
            />
            <p className="text-lg font-semibold no-selectable">{product?.name() || '전체'}</p>
        </div>
    );
});
