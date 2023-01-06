import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {OrgAddAppInfoPage} from '^components/pages/OrgAddAppInfoPage';

export const OrgAddAppInfoPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/new/[appId]/information',
    path: (orgId: number, appId: number) => pathReplace(OrgAddAppInfoPageRoute.pathname, {id: orgId, appId}),
});

export default OrgAddAppInfoPage;

OrgAddAppInfoPage.getLayout = getOrgMainLayout;
