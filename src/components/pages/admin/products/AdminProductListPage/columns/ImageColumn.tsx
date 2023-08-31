import {memo} from 'react';
import {ColumnProps} from './props';

export const ImageColumn = memo((props: ColumnProps) => {
    const {product} = props;
    return (
        <div className="max-w-[80px]">
            {product.image ? (
                <img src={product.image} alt="" loading="lazy" className="w-full" />
            ) : (
                <span className="text-gray-500 italic">unset</span>
            )}
        </div>
    );
});
