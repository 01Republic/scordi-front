import React, {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';

interface ProductProfileProps {
    product: ProductDto;
}

export const ProductProfile = memo((props: ProductProfileProps) => {
    const {product} = props;

    return (
        <div>
            <div className="flex items-center gap-2">
                <Avatar className="w-8" src={product.image} alt={product.name()} draggable={false} loading="lazy">
                    <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                </Avatar>
                <div className="flex-1 h-full">
                    <p>{product.name()}</p>
                </div>
            </div>
        </div>
    );
});
ProductProfile.displayName = 'ProductProfile';
