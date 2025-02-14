import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {OrgEmptyPage} from '^clients/private/orgs/OrgEmptyPage';

export const OrgEmptyPageRoute = pathRoute({
    pathname: '/orgs/empty',
    path: () => pathReplace(OrgEmptyPageRoute.pathname, {}),
});

export default function Page() {
    return <OrgEmptyPage />;
}
