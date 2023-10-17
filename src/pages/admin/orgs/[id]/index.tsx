import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminOrgDetailPage} from '^admin/orgs/AdminOrgDetailPage';

export const AdminOrgPageRoute = pathRoute({
    pathname: '/admin/orgs/[id]',
    path: (id: number) => pathReplace(AdminOrgPageRoute.pathname, {id: id}),
});

export default function AdminOrgPage() {
    const router = useRouter();

    return <AdminOrgDetailPage />;
}
