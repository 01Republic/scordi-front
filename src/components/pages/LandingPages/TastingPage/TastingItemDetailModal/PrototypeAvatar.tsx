import React, {memo} from 'react';
import {ProductDto} from '^types/product.type';
import {Avatar} from '^components/Avatar';

interface PrototypeAvatarProps {
    proto: ProductDto;
}

export const PrototypeAvatar = memo((props: PrototypeAvatarProps) => {
    const {proto} = props;

    return (
        <div className="flex items-center space-x-2 mb-2">
            <Avatar src={proto.image} className="w-6 h-6" />
            <p className="text-sm">{proto.nameEn}</p>
        </div>
    );
});
