import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import GoogleWorkspaceLogo from '^public/images/logo/external/logo_google_workspace.png';
import SlackLogo from '^public/images/logo/external/logo_slack.png';
import {IntegrationProviderItem} from './IntegrationProviderItem';

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
                    <IntegrationProviderItem id="slack" name="슬랙" logo={SlackLogo} isInstalled={false} />
                </li>

                <li className="border-b last-of-type:border-none">
                    <IntegrationProviderItem
                        id="google-workspace"
                        name="구글 워크스페이스"
                        logo={GoogleWorkspaceLogo}
                        isInstalled={true}
                    />
                </li>
            </ul>
        </OrgSettingsLayout>
    );
});
