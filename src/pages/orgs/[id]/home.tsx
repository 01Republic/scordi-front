import React from 'react';
import {useRouter} from 'next/router';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {BillingListMobile} from '^components/BillingListMobile';
import {Icon} from '^components/Icon';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {AppSearchPageRoute} from '^pages/apps/search';
import {TitleSection} from '^components/v2/TitleSection';
import {BillingCalendar} from '^components/pages/dashboard/BillingCalendar';
import {PreLoader} from '^components/PreLoader';
import {useCalendar} from '^hooks/useCalendar';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {useDashboardSummary} from '^hooks/useDashboardSummary';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {NewBillingHistoryPageRoute} from '^pages/orgs/[id]/apps/billingHistories/new';

export const OrgHomeRoute = pathRoute({
    pathname: '/orgs/[id]/home',
    path: (orgId: number) => pathReplace(OrgHomeRoute.pathname, {id: orgId}),
});

export default function HomePage() {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {month} = useCalendar();
    const {summaryDto} = useDashboardSummary();

    if (!organizationId) return <PreLoader />;
    if (!summaryDto) return <></>;

    return (
        <>
            <MobileTopNav>
                <BackButton href={OrgAppsIndexPageRoute.path(organizationId)} />
            </MobileTopNav>

            <TitleSection.Collapse title={`${month}월`} triggerText={`US$ ${summaryDto.didPayAmount.toLocaleString()}`}>
                <MobileKeyValueItem label="나간돈" value={`US$ ${summaryDto.didPayAmount.toLocaleString()}`} />
                <MobileKeyValueItem label="나갈돈" value={`US$ ${summaryDto.willPayAmount.toLocaleString()}`} />
                <MobileKeyValueItem label="미출금" value={`US$ ${summaryDto.total.toLocaleString()}`} />
            </TitleSection.Collapse>

            <BillingCalendar />

            {/* TODO: 여기에 앱을 넣을 게 아니라, 결제예측 모델을 개발하고 예측목록을 넣어야 할 듯. 호출도 월간으로 쿼리 할 수 있는 예측 컨트롤러가 필요. */}
            <BillingListMobile />

            <MobileBottomNav>
                <MobileBottomNav.Item href={NewBillingHistoryPageRoute.path(organizationId)} icon={<Icon.Plus />} />
            </MobileBottomNav>

            {/*<ContentLayout>*/}
            {/*    <div className="space-y-5 pb-20">*/}
            {/*        <div>*/}
            {/*            <div className={'flex-1 space-y-5 lg:pr-5'}>*/}
            {/*                <h2 className="text-24 font-semibold">{apps.length}개의 서비스가 연동되었어요!</h2>*/}
            {/*                <div*/}
            {/*                    className={'flex justify-between p-[16px] bg-[#F9FAFB] rounded-[10px] items-center'}*/}
            {/*                    onClick={() => router.push(`/orgs/${organizationId}/summary`)}*/}
            {/*                >*/}
            {/*                    <p>이번달 총 비용</p>*/}
            {/*                    <div className={'flex items-center'}>*/}
            {/*                        <p className={'font-semibold'}>USD {summaryDto.total.toLocaleString()}</p>*/}
            {/*                        <Icon.ChevronRight />*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={'lg:max-w-[600px]'}>*/}
            {/*            <div className={'flex-1 space-y-5'}>*/}
            {/*                /!* TODO: 여기에 앱을 넣을 게 아니라, 결제예측 모델을 개발하고 예측목록을 넣어야 할 듯. 호출도 월간으로 쿼리 할 수 있는 예측 컨트롤러가 필요. *!/*/}
            {/*                <BillingListMobile summaryDto={summaryDto} apps={apps} year={year} month={month} />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</ContentLayout>*/}
        </>
    );
}

HomePage.getLayout = getOrgMainLayout;
