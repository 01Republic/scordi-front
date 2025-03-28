import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {OrganizationBizInfoPage} from '^clients/public/home/LandingPages/SignAuthPage/SignBizInfo';

export const OrgCreatePageRoute = pathRoute({
    pathname: '/orgs/new',
    path: () => pathReplace(OrgCreatePageRoute.pathname, {}),
});

export default function OrgCreatePage() {
    return <OrganizationBizInfoPage />;
}
