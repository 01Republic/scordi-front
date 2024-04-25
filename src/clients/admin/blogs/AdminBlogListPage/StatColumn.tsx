import {memo} from 'react';
import {ColumnProps} from './ColumnProps.type';

export const StatColumn = memo((props: ColumnProps) => {
    const {post} = props;
    return <div className="hidden md:block">{[post.visitCount, post.likeCount, post.unlikeCount].join(' / ')}</div>;
});
