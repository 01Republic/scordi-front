import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminNotificationTemplateListPage} from '^admin/notification/templates/AdminNotificationTemplateListPage';

export const AdminNotificationTemplateListPageRoute = pathRoute({
    pathname: '/admin/notification/templates',
    path: () => pathReplace(AdminNotificationTemplateListPageRoute.pathname, {}),
});

export default function Page() {
    return <AdminNotificationTemplateListPage />;
}
