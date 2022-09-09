import React, { useEffect, useState } from 'react';
import { PageRoute } from '^types/pageRoute.type';
import { useRouter } from 'next/router';
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { ContentLayout } from '^layouts/ContentLayout';
import {
  ContentHeading,
  ContentHeadingPrimaryButton,
  ContentHeadingSecondaryButton,
} from '^layouts/ContentLayout/ContentHeading';
import { IoAddCircleOutline } from '@react-icons/all-files/io5/IoAddCircleOutline';
import { IoPersonOutline } from '@react-icons/all-files/io5/IoPersonOutline';
import { ContentPanel, ContentPanelItem, ContentPanelList } from '^layouts/ContentLayout/ContentPanel';
import { OrgApplicationSelectPageRoute } from '^pages/orgs/[id]/apps/new/select';
import { ApplicationDto } from '^types/application.type';
import { getApplications } from '^api/application.api';
import { errorNotify } from '^utils/toast-notify';
import { t_BillingCycleTerm } from '^types/applicationBillingCycle.type';

export const OrgAppsIndexPageRoute: PageRoute = {
  pathname: '/orgs/[id]/apps',
  path: (orgId: number) => OrgAppsIndexPageRoute.pathname.replace('[id]', String(orgId)),
}

export default function OrgAppsIndexPage() {
  const router = useRouter();
  const organizationId = Number(router.query.id);
  const [apps, setApps] = useState<ApplicationDto[]>([]);

  useEffect(() => {
    getApplications({ where: { organizationId }, order: { id: 'DESC' } })
      .then(({ data }) => {
        setApps(data.items);
      })
      .catch(errorNotify);
  }, [organizationId]);


  return (
    <ContentLayout>
      <ContentHeading title="Apps">
        <div>
          <ContentHeadingSecondaryButton>
            <IoPersonOutline className="btn-icon" />
            <span>Add New</span>
          </ContentHeadingSecondaryButton>

          <ContentHeadingPrimaryButton onClick={() => router.push(OrgApplicationSelectPageRoute.path(organizationId))}>
            <IoAddCircleOutline className="btn-icon" />
            <span>Add New</span>
          </ContentHeadingPrimaryButton>
        </div>
      </ContentHeading>

      <ContentPanel title="Apps">
        {apps.length <= 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center opacity-50">
            <img className="w-[50%] lg:w-[30%] min-w-[200px]" src="/images/illustration/big-isolated-employee-working-office-workplace-flat-illustration/Mar-Business_1-800px.png" alt="Result not found." />
            <div className="pb-10">
              <p className="text-gray-500 font-bold text-2xl">사용하고 있는 서비스를 등록해보세요 :)</p>
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
  )
};

OrgAppsIndexPage.getLayout = getOrgMainLayout;

interface OrgAppListItemProps {
  app: ApplicationDto;
}
function OrgAppListItem({ app }: OrgAppListItemProps) {
  const appProto = app.prototype;

  return (
    <ContentPanelItem>
      {/* 1 */}
      <div className="bs-col px-0 bs-row mx-0 items-center">
        <div className="avatar mr-3">
          <div className="mask mask-squircle h-8 w-8">
            <img alt={`${appProto.name} Logo`} src={appProto.image} />
          </div>
        </div>
        <div className="bs-col px-0">
          <p className="font-bold">{appProto.name}</p>
          {/* 연동상태 */}
          <span className="badge badge-xs text-2xs">연동상태</span>

          {/*<p className="text-xs text-gray-500">*/}
          {/*  <div className="badge badge-xs text-2xs">neutral</div>*/}
          {/*  /!*<div className="badge badge-primary badge-outline badge-xs text-2xs"></div>*!/*/}
          {/*</p>*/}
        </div>
      </div>

      {/* 2 */}
      {/* 요금제 */}
      <div className="bs-col px-0">
        <div>
          <div className="rounded px-2 py-1 text-center font-semibold bg-pink-50 text-pink-500 text-xs w-[60px]">{app.paymentPlan.name}</div>
        </div>
      </div>

      {/* 3 */}
      {/* 단가 */}
      <div className="bs-col px-0">
        <div>
          <span className="text-sm">$</span>
          <span className="font-bold">{app.billingCycle.unitPrice}</span>
          &nbsp;
          <span className="text-sm text-gray-500">{app.billingCycle.isPerUser ? '사용자/' : ''}</span>
          <span className="text-sm text-gray-500">{t_BillingCycleTerm(app.billingCycle.term)}</span>
        </div>
      </div>

      {/* 3 */}
      {/* 인원 */}
      <div className="bs-col px-0">
        <div className="w-fit text-right">
          <div className="" style={{ lineHeight: 1 }}>
            <span className="text-sm">x</span>
            <span className="font-bold">{app.accountCount}</span>
            &nbsp;
            <span className="text-sm text-gray-500">{`명`}</span>
            &nbsp;
          </div>
          <div style={{ lineHeight: 1 }}>
            <div className="avatar-group -space-x-3">
              <div className="avatar">
                <div className="w-6">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-6">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-6">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-6 bg-neutral-focus text-neutral-content">
                  <span className="text-2xs">+{app.accountCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 */}
      <div className="bs-col px-0">
        <div className="w-fit text-right">
          {/* 결제예정금액 */}
          <div className="text-info" style={{ lineHeight: 1 }}>
            <span className="text-sm">$</span>
            <span className="font-bold">{app.billingCycle.unitPrice * app.accountCount}</span>
          </div>
          {/* 결제예정일 */}
          <div style={{ lineHeight: 1 }}>
            <span className="text-xs">next: 2022-10-01</span>
          </div>
        </div>
      </div>

      {/* 3 */}
      {/* 변동금액 */}
      <div className="bs-col px-0">
        <div>1</div>
      </div>

      {/* 4 */}
      <div>
        <button className="btn btn-primary btn-sm">Show</button>
      </div>
    </ContentPanelItem>
  )
}
