import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminNotificationTemplateDetailPage} from '^admin/notification/templates/AdminNotificationTemplateDetailPage';

export const AdminNotificationTemplateDetailPageRoute = pathRoute({
    pathname: '/admin/notification/templates/[id]',
    path: (id: number) => pathReplace(AdminNotificationTemplateDetailPageRoute.pathname, {id}),
});

export default function Page() {
    return <AdminNotificationTemplateDetailPage />;
}
