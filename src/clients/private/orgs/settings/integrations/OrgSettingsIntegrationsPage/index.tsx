import {memo} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import {useIntegrationWorkspaceInSettingPage} from '^models/IntegrationWorkspace/hook';
import {IntegrationSlack} from './IntegrationSlack';
import {IntegrationGoogleWorkspace} from './IntegrationGoogleWorkspace';

export const OrgSettingsIntegrationsPage = memo(function OrgSettingsIntegrationsPage() {
    const orgId = useOrgIdParam();
    const {refetch, findSlack, findGoogleWorkspace, isLoading} = useIntegrationWorkspaceInSettingPage(orgId);

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: '서비스 연동',
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
