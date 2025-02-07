import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminScordiSubscriptionListPage} from '^admin/billing/scordi-subscriptions/AdminScordiSubscriptionListPage';

export const AdminScordiSubscriptionListPageRoute = pathRoute({
    pathname: '/admin/billing/scordi-subscriptions',
    path: () => pathReplace(AdminScordiSubscriptionListPageRoute.pathname, {}),
});

export default function Page() {
    return <AdminScordiSubscriptionListPage />;
}
