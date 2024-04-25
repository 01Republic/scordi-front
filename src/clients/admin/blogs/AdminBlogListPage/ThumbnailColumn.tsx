import {memo} from 'react';
import {ColumnProps} from './ColumnProps.type';

export const ThumbnailColumn = memo((props: ColumnProps) => {
    const {post} = props;

    return (
        <div className="max-w-[80px]">
            {post.thumbnailUrl ? (
                <img src={post.thumbnailUrl} alt="" loading="lazy" className="w-full" />
            ) : (
                <span className="text-gray-500 italic">unset</span>
            )}
        </div>
    );
});
