import {memo} from 'react';
import {ColumnProps} from './props';

export const ImageColumn = memo((props: ColumnProps) => {
    const {product} = props;
    return (
        <div className="">
            {product.image ? (
                <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    className="h-[30px] hover:scale-[4] w-auto transition-all bg-white"
                />
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
                <img
                    src={product.ogImageUrl}
                    alt=""
                    loading="lazy"
                    className="h-[30px] hover:scale-[8] w-auto border transition-all bg-white"
                />
            ) : (
                <span className="text-gray-500 italic">unset</span>
            )}
        </div>
    );
});
