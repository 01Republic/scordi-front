import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminBlogDetailPage} from '^admin/blogs/AdminBlogDetailPage';

export const AdminPostPageRoute = pathRoute({
    pathname: '/admin/posts/[id]',
    path: (id: number) => pathReplace(AdminPostPageRoute.pathname, {id}),
});

export default function AdminPostPage() {
    const router = useRouter();

    return <AdminBlogDetailPage />;
}
