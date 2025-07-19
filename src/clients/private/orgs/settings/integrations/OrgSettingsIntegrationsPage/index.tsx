import {memo} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import {useIntegrationWorkspaceInSettingPage} from '^models/IntegrationWorkspace/hook';
import {IntegrationSlack} from './IntegrationSlack';
import {IntegrationGoogleWorkspace} from './IntegrationGoogleWorkspace';
import {useTranslation} from 'next-i18next';

export const OrgSettingsIntegrationsPage = memo(function OrgSettingsIntegrationsPage() {
    const orgId = useOrgIdParam();
    const {refetch, findSlack, findGoogleWorkspace, isLoading} = useIntegrationWorkspaceInSettingPage(orgId);
    const {t} = useTranslation('integrations');

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: t('serviceIntegration') as string,
                active: true,
                href: OrgSettingsIntegrationsPageRoute.path(orgId),
            }}
            ignoreCardWrap
        >
            <ul className="bg-white border rounded-lg">
                <li className="border-b last-of-type:border-none">
                    <IntegrationSlack config={findSlack()} reload={refetch} isLoading={isLoading} />
                </li>

                <li className="border-b last-of-type:border-none">
                    <IntegrationGoogleWorkspace config={findGoogleWorkspace()} reload={refetch} />
                </li>
            </ul>
        </OrgSettingsLayout>
    );
});
