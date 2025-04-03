import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, useIdParam} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {SlackWorkspaceDetailPageHeader} from '^clients/private/orgs/settings/integrations/slack/OrgIntegrationSlackWorkspaceDetailPage/SlackWorkspaceDetailPageHeader';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';

export const OrgIntegrationSlackWorkspaceDetailPage = memo(function OrgIntegrationSlackWorkspaceDetailPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const workspaceId = useIdParam('slackWorkspaceId');
    const {data: workspace} = useSlackWorkspaceInDetailPage();

    console.log('orgId', orgId);
    console.log('workspaceId', workspaceId);
    console.log('workspace', workspace);

    return (
        <OrgSettingsLayout breadcrumbPath="Slack Workspace" activeMenuName="서비스 연동" clearBody>
            <div>
                {/* header */}
                <SlackWorkspaceDetailPageHeader />

                {/* tabs */}
                <div></div>

                {/* tab-body */}
                <div></div>
            </div>
        </OrgSettingsLayout>
    );
});
