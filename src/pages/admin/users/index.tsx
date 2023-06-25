import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminUserListPage} from '^components/pages/admin/users/AdminUserListPage';

export const AdminUsersPageRoute = pathRoute({
    pathname: '/admin/users',
    path: () => pathReplace(AdminUsersPageRoute.pathname, {}),
});

export default function AdminUsersPage() {
    const router = useRouter();

    return <AdminUserListPage />;
}
