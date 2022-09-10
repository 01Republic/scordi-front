import React, { useEffect, useState } from 'react';
import { PageRoute } from '^types/pageRoute.type';
import { useRouter } from 'next/router';
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { ContentLayout } from '^layouts/ContentLayout';
import {
  ContentHeading,
  ContentHeadingPrimaryButton,
} from '^layouts/ContentLayout/ContentHeading';
import { IoAddCircleOutline } from '@react-icons/all-files/io5/IoAddCircleOutline';
import {
  ContentPanel,
  ContentPanelList,
} from '^layouts/ContentLayout/ContentPanel';
import { OrgApplicationSelectPageRoute } from '^pages/orgs/[id]/apps/new/select';
import { ApplicationDto } from '^types/application.type';
import { getApplications } from '^api/application.api';
import { errorNotify } from '^utils/toast-notify';
import { OrgAppListItem } from '^components/OrgAppListItem';

export const OrgAppsIndexPageRoute: PageRoute = {
  pathname: '/orgs/[id]/apps',
  path: (orgId: number) =>
    OrgAppsIndexPageRoute.pathname.replace('[id]', String(orgId)),
};

function OrgAppsIndexPage() {
  const router = useRouter();
  const organizationId = Number(router.query.id);
  const [apps, setApps] = useState<ApplicationDto[]>([]);

  useEffect(() => {
    !!organizationId &&
      getApplications({ where: { organizationId }, order: { id: 'DESC' } })
        .then(({ data }) => {
          setApps(data.items);
        })
        .catch(errorNotify);
  }, [organizationId]);

  useEffect(() => {
    console.log(apps);
  }, [apps]);

  return (
    <ContentLayout>
      <ContentHeading title="연동 서비스">
        <div>
          <ContentHeadingPrimaryButton
            onClick={() =>
              router.push(OrgApplicationSelectPageRoute.path(organizationId))
            }
          >
            <IoAddCircleOutline className="btn-icon" />
            <span>추가하기</span>
          </ContentHeadingPrimaryButton>
        </div>
      </ContentHeading>

      <ContentPanel title="서비스 목록">
        {apps.length <= 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center opacity-50">
            <img
              className="w-[50%] lg:w-[30%] min-w-[200px]"
              src="/images/illustration/big-isolated-employee-working-office-workplace-flat-illustration/Mar-Business_1-800px.png"
              alt="Result not found."
            />
            <div className="pb-10">
              <p className="text-gray-500 font-bold text-2xl">
                사용하고 있는 서비스를 등록해보세요 :)
              </p>
            </div>
          </div>
        ) : (
          <ContentPanelList>
            {apps.map((app) => (
              <OrgAppListItem key={app.id} app={app} />
            ))}
          </ContentPanelList>
        )}
      </ContentPanel>
    </ContentLayout>
  );
}

OrgAppsIndexPage.getLayout = getOrgMainLayout;

export default OrgAppsIndexPage;
