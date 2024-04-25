import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminBlogNewPage} from '^admin/blogs/AdminBlogNewPage';

export const AdminNewPostPageRoute = pathRoute({
    pathname: '/admin/posts/new',
    path: () => pathReplace(AdminNewPostPageRoute.pathname, {}),
});

export default function AdminNewPostPage() {
    const router = useRouter();

    return <AdminBlogNewPage />;
}
