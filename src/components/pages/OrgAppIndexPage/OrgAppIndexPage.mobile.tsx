import React, {memo} from 'react';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {OrgApplicationSelectPageRoute} from '^pages/orgs/[id]/apps/new/select';
import {Icon} from '^components/Icon';
import {TitleSection} from '^components/v2/TitleSection';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {ApplicationListMobile} from './ApplicationList.mobile';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const OrgAppIndexPageMobile = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);

    return (
        <OrgMobileLayout>
            <TitleSection.TopPadding />
            <TitleSection.Simple>
                <TitleSection.Title text={`서비스`} />
                <TitleSection.Button text="달력보기" href={OrgHomeRoute.path(organizationId)} />
            </TitleSection.Simple>

            <ApplicationListMobile />

            <MobileBottomNav>
                <MobileBottomNav.Item href={OrgApplicationSelectPageRoute.path(organizationId)} icon={<Icon.Plus />} />
            </MobileBottomNav>
        </OrgMobileLayout>
    );
});
