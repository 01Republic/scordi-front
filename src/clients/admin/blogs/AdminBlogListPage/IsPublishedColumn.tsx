import {memo} from 'react';
import {humanizeTimeDistance2} from '^utils/dateTime';
import {BooleanColumn} from '^admin/share/panels/CardTablePanel';
import {ColumnProps} from './ColumnProps.type';

export const IsPublishedColumn = memo((props: ColumnProps) => {
    const {post} = props;

    if (!post.publishAt) return <BooleanColumn value={false} />;
    const publishAt = new Date(post.publishAt);
    const now = new Date();
    const published = publishAt.getTime() <= now.getTime();
    return <BooleanColumn value={published} falseVal={humanizeTimeDistance2(now, publishAt)} />;
});
