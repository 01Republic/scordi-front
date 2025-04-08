import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import {IntegrationSlack} from './IntegrationSlack';
import {IntegrationGoogleWorkspace} from './IntegrationGoogleWorkspace';
import {toast} from 'react-hot-toast';

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
            <ul className="bg-white border rounded-lg">
                <li className="border-b last-of-type:border-none">
                    <IntegrationSlack />
                </li>

                <li
                    className="border-b last-of-type:border-none opacity-30"
                    onClick={() => toast('준비중인 기능입니다.')}
                >
                    <IntegrationGoogleWorkspace />
                </li>
            </ul>
        </OrgSettingsLayout>
    );
});
