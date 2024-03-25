import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {ProductDto} from '^models/Product/type';

interface ProductAvatarProps {
    product: ProductDto | null;
    size?: number;
    wrapperClass?: string;
    displayName?: boolean;
    displayOutline?: boolean;
}

export const ProductAvatar = memo((props: ProductAvatarProps) => {
    const {product, size = 8, wrapperClass = '', displayName = true, displayOutline = true} = props;

    return (
        <div className="flex items-center space-x-4">
            <Avatar
                src={product?.image}
                className={`w-${size} h-${size} ${
                    displayOutline ? 'ring ring-gray-200 ring-offset-base-100 ring-offset-4' : ''
                }`}
            />
            {displayName && <p className="text-lg font-semibold no-selectable">{product?.name() || '전체'}</p>}
        </div>
    );
});
