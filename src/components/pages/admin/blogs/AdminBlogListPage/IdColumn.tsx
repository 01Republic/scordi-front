import {memo} from 'react';
import {ColumnProps} from './ColumnProps.type';

export const IdColumn = memo((props: ColumnProps) => {
    const {post} = props;
    return <>{post.id}</>;
});
