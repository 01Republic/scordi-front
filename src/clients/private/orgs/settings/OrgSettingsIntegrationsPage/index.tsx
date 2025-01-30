import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import {IntegrationSlack} from './IntegrationSlack';
import {IntegrationGoogleWorkspace} from './IntegrationGoogleWorkspace';

export const OrgSettingsIntegrationsPage = memo(function OrgSettingsIntegrationsPage() {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OrgSettingsLayout
            breadcrumbPath={{
                text: '서비스 연동',
                active: true,
                href: OrgSettingsIntegrationsPageRoute.path(orgId),
            }}
            ignoreCardWrap
        >
            <div className="pt-2 mb-6">
                <h3 className="text-xl font-semibold">서비스 연동</h3>
            </div>

            <ul className="bg-white border rounded-lg">
                <li className="border-b last-of-type:border-none">
                    <IntegrationSlack />
                </li>

                <li className="border-b last-of-type:border-none">
                    <IntegrationGoogleWorkspace />
                </li>
            </ul>
        </OrgSettingsLayout>
    );
});
