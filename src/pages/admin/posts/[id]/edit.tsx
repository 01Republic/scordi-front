import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminBlogEditPage} from '^components/pages/admin/blogs/AdminBlogEditPage';

export const AdminEditPostPageRoute = pathRoute({
    pathname: '/admin/posts/[id]/edit',
    path: (id: number) => pathReplace(AdminEditPostPageRoute.pathname, {id: id}),
});

export default function AdminEditPostPage() {
    const router = useRouter();

    return <AdminBlogEditPage />;
}
