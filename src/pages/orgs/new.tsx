import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {OrgCreatePage} from '^clients/private/orgs/OrgCreatePage';

export const OrgCreatePageRoute = pathRoute({
    pathname: '/orgs/new',
    path: () => pathReplace(OrgCreatePageRoute.pathname, {}),
});

export default function Page() {
    return <OrgCreatePage />;
}
