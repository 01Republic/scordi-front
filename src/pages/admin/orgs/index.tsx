import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminOrgListPage} from '^admin/orgs/AdminOrgListPage';

export const AdminOrgsPageRoute = pathRoute({
    pathname: '/admin/orgs',
    path: () => pathReplace(AdminOrgsPageRoute.pathname, {}),
});

export default function AdminOrgsPage() {
    const router = useRouter();

    return <AdminOrgListPage />;
}
