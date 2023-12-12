import {memo} from 'react';
import {ColumnProps} from './ColumnProps.type';
import {AdminEditPostPageRoute} from '^pages/admin/posts/[id]/edit';
import {postManageApi} from '^models/Post/api';
import {useRouter} from 'next/router';

export const ActionColumn = memo((props: ColumnProps) => {
    const {post, fetchData} = props;
    const router = useRouter();

    const onEditButtonClick = () => router.push(AdminEditPostPageRoute.path(post.id));

    const onDeleteButtonClick = () => {
        if (confirm('Are you sure?')) {
            postManageApi.destroy(post.id).then(() => {
                if (fetchData) fetchData({order: {id: 'DESC'}});
            });
        }
    };

    return (
        <div className="flex gap-1">
            <button className="btn btn-warning btn-sm" onClick={onEditButtonClick}>
                수정
            </button>

            <button className="btn btn-error btn-sm" onClick={onDeleteButtonClick}>
                삭제
            </button>
        </div>
    );
});
