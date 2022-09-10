import React from 'react';
import { PageRoute } from '^types/pageRoute.type';
import { useRouter } from 'next/router';
import { useCurrentOrg } from '^hooks/useCurrentOrg';
import OrgMainLayout, { getOrgMainLayout } from '^layouts/org/mainLayout';
import { OrganizationDto } from '^types/organizationTypes';
import { PreLoader } from '^components/PreLoader';
import { ContentLayout } from '^layouts/ContentLayout';
import { ContentPanel } from '^layouts/ContentLayout/ContentPanel';

export const OrgMembershipIndexPageRoute: PageRoute = {
  pathname: '/orgs/[id]/memberships',
  path: (orgId: number) =>
    OrgMembershipIndexPageRoute.pathname.replace('[id]', String(orgId)),
};

export default function OrgMembershipIndexPage() {
  const router = useRouter();
  const organizationId = Number(router.query.id);
  const { currentOrg } = useCurrentOrg(organizationId);
  const org = currentOrg || ({} as OrganizationDto);

  if (!org.id) return <PreLoader />;

  return (
    <ContentLayout>
      <ContentPanel>
        {currentOrg && <OrgMainLayout.OrgProfile currentOrg={currentOrg} />}
      </ContentPanel>
    </ContentLayout>
  );
}

OrgMembershipIndexPage.getLayout = getOrgMainLayout;
