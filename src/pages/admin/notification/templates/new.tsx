import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminNotificationTemplateNewPage} from '^admin/notification/templates/AdminNotificationTemplateNewPage';

export const AdminNotificationTemplateNewPageRoute = pathRoute({
    pathname: '/admin/notification/templates/new',
    path: () => pathReplace(AdminNotificationTemplateNewPageRoute.pathname, {}),
});

export default function Page() {
    return <AdminNotificationTemplateNewPage />;
}
