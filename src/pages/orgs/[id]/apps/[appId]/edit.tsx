import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {useApplication} from '^hooks/useApplications';
import {useSetRecoilState} from 'recoil';
import {applicationIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useForm} from 'react-hook-form';
import {ConnectStatus, UpdateApplicationRequestDto} from '^types/application.type';
import {ApplicationEditForm} from '^components/pages/OrgAppEditPage/ApplicationEditForm';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {TitleSection} from '^components/v2/TitleSection';
import {AppNameWithLogoBlock} from '^components/pages/OrgAppInfoPage/AppNameWithLogoBlock';
import {CTAButton} from '^components/v2/ui/buttons/CTAButton';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {ApplicationInputsBlock} from '^components/pages/OrgAppEditPage/ApplicationInputsBlock';
import OrgMobileLayout from '^layouts/org/mobileLayout';

export const OrgApplicationEditPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]/edit',
    path: (orgId: number, appId: number) => pathReplace(OrgApplicationEditPageRoute.pathname, {id: orgId, appId}),
});

export default function OrgAppEditPage() {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('appId', applicationIdParamState);
    const application = useApplication();
    const form = useForm<UpdateApplicationRequestDto>();

    if (!application) return <></>;

    return (
        <OrgMobileLayout>
            <ApplicationEditForm form={form}>
                <MobileTopNav>
                    <BackButton text="취소" />
                </MobileTopNav>

                <TitleSection.TopPadding />
                <TitleSection.Simple flex={false}>
                    <AppNameWithLogoBlock prototype={application.prototype} />
                </TitleSection.Simple>

                <ApplicationInputsBlock form={form} />

                <br />
                <br />
                <br />
                <br />
                <br />

                <MobileBottomNav>
                    <CTAButton type="submit" text="저장" />
                </MobileBottomNav>
            </ApplicationEditForm>
        </OrgMobileLayout>
    );
}
