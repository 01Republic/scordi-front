import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminUserDetailPage} from '^components/pages/admin/users/AdminUserDetailPage';

export const AdminUserPageRoute = pathRoute({
    pathname: '/admin/users/[id]',
    path: (id: number) => pathReplace(AdminUserPageRoute.pathname, {id: id}),
});

export default function AdminUserPage() {
    const router = useRouter();

    return <AdminUserDetailPage />;
}
