import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminBizOpsWorkspaceListPage} from '^components/pages/admin/biz-ops/workspaces/AdminBizOpsWorkspaceListPage';

export const BizOpsWorkspaceListRoute = pathRoute({
    pathname: '/admin/biz-ops/manual/workspaces',
    path: () => pathReplace(BizOpsWorkspaceListRoute.pathname, {}),
});

export default function BizOpsWorkspaceList() {
    return <AdminBizOpsWorkspaceListPage />;
}
