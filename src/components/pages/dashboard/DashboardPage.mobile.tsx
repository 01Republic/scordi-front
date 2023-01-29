import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {TitleSection} from '^components/v2/TitleSection';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {BillingCalendar} from '^components/pages/dashboard/BillingCalendar';
import {BillingListMobile} from '^components/BillingListMobile';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {NewBillingHistoryPageRoute} from '^pages/orgs/[id]/apps/billingHistories/new';
import {Icon} from '^components/Icon';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import React, {memo} from 'react';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCalendar} from '^hooks/useCalendar';
import {useDashboardSummary} from '^hooks/useDashboardSummary';
import {PreLoader} from '^components/PreLoader';

export const DashboardPageMobile = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const {month} = useCalendar();
    const summaryDto = useDashboardSummary();

    if (!organizationId || !summaryDto) return <PreLoader />;

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
        </>
    );
});
