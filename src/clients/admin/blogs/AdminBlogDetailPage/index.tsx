import {memo} from 'react';
import {AdminDetailPageLayout} from '^admin/layouts/DetailPageLayout';
import {AdminPostsPageRoute} from '^pages/admin/posts';

export const AdminBlogDetailPage = memo(() => {
    return (
        <AdminDetailPageLayout
            title="게시글 상세"
            breadcrumbs={[
                {text: '블로그 관리'},
                {text: '게시글 목록', href: AdminPostsPageRoute.path()},
                {text: '게시글 상세'},
            ]}
        ></AdminDetailPageLayout>
    );
});
