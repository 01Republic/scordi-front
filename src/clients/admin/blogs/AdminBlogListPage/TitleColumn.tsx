import {memo} from 'react';
import {ColumnProps} from './ColumnProps.type';

export const TitleColumn = memo((props: ColumnProps) => {
    const {post} = props;
    return <div className="">{post.title}</div>;
});
