import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTranslation} from 'next-i18next';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgBasicInfoSection} from './OrgBasicInfoSection';
import {SubscriptionInfoSection} from './SubscriptionInfoSection';
import {WorkspaceSettingSection} from './WorkspaceSettingSection';
import {WorkspaceDangerousSection} from './WorkspaceDangerousSection';

export const OrgSettingsInformationPage = memo(function OrgSettingsInformationPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {t} = useTranslation();

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: t('workspaceSettings.title'),
                active: true,
                href: OrgSettingsInformationPageRoute.path(orgId),
            }}
            ignoreCardWrap
        >
            <OrgBasicInfoSection orgId={orgId} />
            <SubscriptionInfoSection orgId={orgId} />
            <WorkspaceSettingSection orgId={orgId} />
            <WorkspaceDangerousSection orgId={orgId} />
        </OrgSettingsLayout>
    );
});
