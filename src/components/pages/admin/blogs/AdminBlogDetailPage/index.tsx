import {memo} from 'react';
import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {AdminPostsPageRoute} from '^pages/admin/posts';
import {AdminBlogEditPage} from '../AdminBlogEditPage';

// export const AdminBlogDetailPage = memo(() => {
//     return (
//         <AdminDetailPageLayout
//             title="게시글 상세"
//             breadcrumbs={[
//                 {text: '블로그 관리'},
//                 {text: '게시글 목록', href: AdminPostsPageRoute.path()},
//                 {text: '게시글 상세'},
//             ]}
//         ></AdminDetailPageLayout>
//     );
// });

export const AdminBlogDetailPage = AdminBlogEditPage;
