import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminScordiPlanListPage} from '^admin/billing/scordi-plans/AdminScordiPlanListPage';

export const AdminScordiPlanListPageRoute = pathRoute({
    pathname: '/admin/billing/scordi-plans',
    path: () => pathReplace(AdminScordiPlanListPageRoute.pathname, {}),
});

export default function Page() {
    return <AdminScordiPlanListPage />;
}
