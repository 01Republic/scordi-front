import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminBizOpsWorkflowListPage} from '^components/pages/admin/biz-ops/workflows/AdminBizOpsWorkflowListPage';

export const BizOpsWorkflowListRoute = pathRoute({
    pathname: '/admin/biz-ops/manual/workflows',
    path: () => pathReplace(BizOpsWorkflowListRoute.pathname, {}),
});

export default function BizOpsWorkflowList() {
    return <AdminBizOpsWorkflowListPage />;
}
