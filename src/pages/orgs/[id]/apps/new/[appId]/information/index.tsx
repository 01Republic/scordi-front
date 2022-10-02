import React from 'react';
import { PageRoute } from '^types/pageRoute.type';
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { OrgAddAppInfoPage } from '^components/pages/OrgAddAppInfoPage';

export const OrgAddAppInfoPageRoute: PageRoute = {
  pathname: '/orgs/[id]/apps/new/[appId]/information',
  path: (orgId: number, appId: number) =>
    OrgAddAppInfoPageRoute.pathname
      .replace('[id]', String(orgId))
      .replace('[appId]', String(appId)),
}

export default OrgAddAppInfoPage;

OrgAddAppInfoPage.getLayout = getOrgMainLayout;
