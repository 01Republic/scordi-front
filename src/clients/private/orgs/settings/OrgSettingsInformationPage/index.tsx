import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgBasicInfoSection} from './OrgBasicInfoSection';
import {SubscriptionInfoSection} from './SubscriptionInfoSection';
import {WorkspaceSettingSection} from './WorkspaceSettingSection';
import {OrgSettingsContent} from '^clients/private/_layouts/OrgSettingsLayout/OrgSettingsContent';

export const OrgSettingsInformationPage = memo(function OrgSettingsInformationPage() {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: '워크스페이스 정보',
                active: true,
                href: OrgSettingsInformationPageRoute.path(orgId),
            }}
        >
            <OrgBasicInfoSection orgId={orgId} />
            <SubscriptionInfoSection orgId={orgId} />
            <WorkspaceSettingSection orgId={orgId} />
        </OrgSettingsLayout>
    );
});
