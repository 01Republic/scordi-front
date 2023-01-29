import React, {memo} from 'react';
import {ContentLayout} from '^layouts/ContentLayout';
import {Icon} from '^components/Icon';
import OrgMainLayout from '^layouts/org/mainLayout';
import {useRouter} from 'next/router';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCalendar} from '^hooks/useCalendar';
import {useDashboardSummary} from '^hooks/useDashboardSummary';
import {PreLoader} from '^components/PreLoader';
import {BillingListMobile} from '^components/BillingListMobile';
import {BillingCalendar} from '^components/pages/dashboard/BillingCalendar';

export const DashboardPageDesktop = memo(() => {
    const router = useRouter();
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const summaryDto = useDashboardSummary();

    if (!organizationId || !summaryDto) return <PreLoader />;

    return (
        <OrgMainLayout>
            <ContentLayout title="대시보드">
                <div className="space-y-5 pb-20">
                    <div>
                        <div className={'flex-1 space-y-5 lg:pr-5'}>
                            <h2 className="text-24 font-semibold">{[].length}개의 서비스가 연동되었어요!</h2>
                            <div
                                className={'flex justify-between p-[16px] bg-[#F9FAFB] rounded-[10px] items-center'}
                                onClick={() => router.push(`/orgs/${organizationId}/summary`)}
                            >
                                <p>이번달 총 비용</p>
                                <div className={'flex items-center'}>
                                    <p className={'font-semibold'}>USD {summaryDto.total.toLocaleString()}</p>
                                    <Icon.ChevronRight />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'lg:max-w-[600px]'}>
                        <div className={'flex-1 space-y-5'}>
                            <BillingCalendar />
                            {/* TODO: 여기에 앱을 넣을 게 아니라, 결제예측 모델을 개발하고 예측목록을 넣어야 할 듯. 호출도 월간으로 쿼리 할 수 있는 예측 컨트롤러가 필요. */}
                            <BillingListMobile />
                        </div>
                    </div>
                </div>
            </ContentLayout>
        </OrgMainLayout>
    );
});
