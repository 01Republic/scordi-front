import {orgIdParamState} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsInformationPageRoute} from '^pages/orgs/[id]/settings';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {OrgBasicInfoSection} from './OrgBasicInfoSection';
import {SubscriptionInfoSection} from './SubscriptionInfoSection';
import {WorkspaceDangerousSection} from './WorkspaceDangerousSection';
import {WorkspaceSettingSection} from './WorkspaceSettingSection';

export const OrgSettingsInformationPage = memo(function OrgSettingsInformationPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {t} = useTranslation('workspaceSettings');

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: t('title'),
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
