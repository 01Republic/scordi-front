import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminBlogListPage} from '^admin/blogs/AdminBlogListPage';

export const AdminPostsPageRoute = pathRoute({
    pathname: '/admin/posts',
    path: () => pathReplace(AdminPostsPageRoute.pathname, {}),
});

export default function AdminPostsPage() {
    const router = useRouter();

    return <AdminBlogListPage />;
}
