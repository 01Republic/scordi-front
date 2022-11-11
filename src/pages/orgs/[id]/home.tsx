import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {PageRoute} from '^types/pageRoute.type';
import {ContentLayout} from '^layouts/ContentLayout';
import {ApplicationDto} from '^types/application.type';
import {getApplications} from '^api/application.api';
import {errorNotify} from '^utils/toast-notify';
import {BillingListMobile} from '^components/BillingListMobile';
import {Icon} from '^components/Icon';
import Calendar from 'react-calendar';

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
        getApplications({where: {organizationId}, order: {id: 'DESC'}})
            .then(({data}) => {
                setApps(data.items);
            })
            .catch(errorNotify);
    }, [organizationId]);

    return (
        <ContentLayout>
            <div className="space-y-5">
                <h2 className="text-24 font-semibold">5개의 서비스가 등록되었어요!</h2>

                <div className={'flex justify-between p-[16px] bg-[#F9FAFB] rounded-[10px] items-center'}>
                    <p>이번달 총 비용</p>
                    <div className={'flex items-center'}>
                        <p className={"font-semibold"}>1,000,000원</p>
                        <Icon.ChevronRight/>
                    </div>
                </div>

                <Calendar locale={'ko-KR'}
                          calendarType={'US'}
                          value={new Date()}
                          formatDay={(locale, date) => date.getDate().toString()}
                          tileContent={({date}) => (
                              // TODO: 결제금액 표시
                              <p className={'text-[6px] mt-[5px]'}>
                                  -100,000
                              </p>
                          )}
                          next2Label={null}
                          prev2Label={null}
                          showNeighboringMonth={false}
                />

                {/* TODO: 여기에 앱을 넣을 게 아니라, 결제예측 모델을 개발하고 예측목록을 넣어야 할 듯. 호출도 월간으로 쿼리 할 수 있는 예측 컨트롤러가 필요. */}
                <BillingListMobile apps={apps}/>
            </div>
        </ContentLayout>
    );
}

HomePage.getLayout = getOrgMainLayout;
