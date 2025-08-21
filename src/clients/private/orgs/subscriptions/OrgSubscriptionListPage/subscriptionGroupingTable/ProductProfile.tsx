import React, {memo} from 'react';
import Image from 'next/image';
import {HelpCircle} from 'lucide-react';
import {ProductDto} from '^models/Product/type';

interface ProductProfileProps {
    product: ProductDto;
    width?: number;
    height?: number;
    className?: string;
    profileClassName?: string;
    textClassName?: string;
}

export const ProductProfile = memo((props: ProductProfileProps) => {
    const {product, width = 24, height = 24} = props;
    const {className = 'gap-2', profileClassName, textClassName = 'text-sm font-base'} = props;

    return (
        <div className={`flex items-center max-w-96 ${className}`}>
            {product.image ? (
                <Image
                    src={product.image}
                    alt={product.name()}
                    width={width}
                    height={height}
                    loading="lazy"
                    draggable={false}
                    className={`rounded-full ${profileClassName}`}
                />
            ) : (
                <div
                    className={`flex items-center bg-gray-100 rounded-full ${profileClassName}`}
                    style={{width: width, height: height}}
                >
                    <HelpCircle className="text-gray-300 h-full w-full p-1" />
                </div>
            )}
            <span className={` whitespace-nowrap font-bold ${textClassName}`}>{product.name()}</span>
        </div>
    );
});
