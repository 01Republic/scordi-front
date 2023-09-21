import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminBizOpsWorkflowDetailPage} from '^admin/biz-ops/workflows/AdminBizOpsWorkflowDetailPage';

export const AdminBizOpsWorkflowDetailRoute = pathRoute({
    pathname: '/admin/biz-ops/manual/workflows/[id]',
    path: () => pathReplace(AdminBizOpsWorkflowDetailRoute.pathname, {}),
});

export default function AdminBizOpsWorkflowDetail() {
    const router = useRouter();

    return <AdminBizOpsWorkflowDetailPage />;
}
