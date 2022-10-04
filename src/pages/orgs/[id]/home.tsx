import { useEffect, useState } from 'react';
import { AdminHeader } from '^components/AdminHeader';
import { Badge } from '^components/Badge';
import { GrowthText } from '^components/GrowthText';
import { AddPaymentAmountModal } from '^components/modal/AddPaymentAmountModal';
import { EditServiceModal } from '^components/modal/EditServiceModal';
import { ServiceModal } from '^components/modal/ServiceModal';
import { MonthlyContent } from '^components/MonthlyContent';
import { MonthlyGraphs } from '^components/MonthlyGraphs';
import { useRouter } from 'next/router';
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { PageRoute } from '^types/pageRoute.type';
import { ContentLayout } from '^layouts/ContentLayout';
import { BillingTable } from '^components/pages/dashboard/BillingTable';
import { IoAdd } from '@react-icons/all-files/io5/IoAdd';
import { IoAddOutline } from '@react-icons/all-files/io5/IoAddOutline';
import { OrgApplicationSelectPageRoute } from '^pages/orgs/[id]/apps/new/select';
import { ApplicationDto } from '^types/application.type';
import { getApplications } from '^api/application.api';
import { errorNotify } from '^utils/toast-notify';

const itemDummy = [
  { id: 1, src: 'https://source.unsplash.com/random', name: 'notion' },
  { id: 2, src: 'https://source.unsplash.com/random', name: 'notion' },
  { id: 3, src: 'https://source.unsplash.com/random', name: 'notion' },
  { id: 4, src: 'https://source.unsplash.com/random', name: 'notion' },
  { id: 5, src: 'https://source.unsplash.com/random', name: 'notion' },
];

export const OrgHomeRoute: PageRoute = {
  pathname: '/orgs/[id]/home',
  path: (orgId: number) => OrgHomeRoute.pathname.replace('[id]', String(orgId)),
};

export default function HomePage() {
  const router = useRouter();
  const organizationId = Number(router.query.id);
  const [apps, setApps] = useState<ApplicationDto[]>([]);
  // const [addService, setAddService] = useState<boolean>(false);
  // const [payment, setPayment] = useState<boolean>(false);
  // const [editService, setEditService] = useState<boolean>(false);
  // const servieItem = itemDummy[0];
  useEffect(() => {
    !!organizationId &&
    getApplications({ where: { organizationId }, order: { id: 'DESC' } })
      .then(({ data }) => {
        setApps(data.items);
      })
      .catch(errorNotify);
  }, [organizationId]);

  return (
    <ContentLayout>
      {/*<ServiceModal open={addService} onClose={() => setAddService(false)} />*/}
      {/*<AddPaymentAmountModal open={payment} onClose={() => setPayment(false)} />*/}
      {/*<EditServiceModal*/}
      {/*  open={editService}*/}
      {/*  onClose={() => setEditService(false)}*/}
      {/*  item={serviceItem}*/}
      {/*/>*/}
      <div className="grid grid-cols-2 gap-5 p-4">
        <MonthlyGraphs />
        <MonthlyContent />
      </div>

      <div className="m-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-24 font-semibold">월별 결제</h2>

            <select className="select" defaultValue={'1'}>
              <option value={'1'}>2022년 9월</option>
              <option value={'2'}>2022년 8월</option>
              <option value={'3'}>2022년 7월</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn btn-outline h-10">엑셀 내보내기</button>
            <button
              className="btn btn-primary h-10 gap-2"
              onClick={() => router.push(OrgApplicationSelectPageRoute.path(organizationId))}
            >
              <IoAddOutline size={20} />
              <span>서비스 추가</span>
            </button>
          </div>
        </div>

        {/* TODO: 여기에 앱을 넣을 게 아니라, 결제예측 모델을 개발하고 예측목록을 넣어야 할 듯. 호출도 월간으로 쿼리 할 수 있는 예측 컨트롤러가 필요. */}
        <BillingTable apps={apps} />
      </div>
    </ContentLayout>
  );
}

HomePage.getLayout = getOrgMainLayout;
