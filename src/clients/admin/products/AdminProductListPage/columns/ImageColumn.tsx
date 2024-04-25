import {memo} from 'react';
import {ColumnProps} from './props';

export const ImageColumn = memo((props: ColumnProps) => {
    const {product} = props;
    return (
        <div className="max-w-[40px]">
            {product.image ? (
                <img src={product.image} alt="" loading="lazy" className="w-full" />
            ) : (
                <span className="text-gray-500 italic">unset</span>
            )}
        </div>
    );
});

export const ThumbnailColumn = memo((props: ColumnProps) => {
    const {product} = props;
    return (
        <div className="w-full pr-2">
            {product.ogImageUrl ? (
                <img src={product.ogImageUrl} alt="" loading="lazy" className="w-full border" />
            ) : (
                <span className="text-gray-500 italic">unset</span>
            )}
        </div>
    );
});
