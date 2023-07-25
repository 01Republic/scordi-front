import {memo} from 'react';
import {ColumnProps} from './props';

export const ImageColumn = memo((props: ColumnProps) => {
    const {prototype} = props;
    return (
        <div className="max-w-[80px]">
            {prototype.image ? (
                <img src={prototype.image} alt="" loading="lazy" className="w-full" />
            ) : (
                <span className="text-gray-500 italic">unset</span>
            )}
        </div>
    );
});
