import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminScordiPaymentListPage} from '^admin/billing/scordi-payments/AdminScordiPaymentListPage';

export const AdminScordiPaymentListPageRoute = pathRoute({
    pathname: '/admin/billing/scordi-payments',
    path: () => pathReplace(AdminScordiPaymentListPageRoute.pathname, {}),
});

export default function Page() {
    return <AdminScordiPaymentListPage />;
}
