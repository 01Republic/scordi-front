import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {OrgListPage} from '^clients/private/orgs/OrgListPage';

export const OrgListPageRoute = pathRoute({
    pathname: '/orgs',
    path: () => pathReplace(OrgListPageRoute.pathname, {}),
});

export default function Page() {
    return <OrgListPage />;
}
