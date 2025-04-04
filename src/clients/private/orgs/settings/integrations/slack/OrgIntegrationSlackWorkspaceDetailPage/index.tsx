import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, useIdParam} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {useTabs} from '^components/util/tabs';
import {SlackWorkspaceDetailPageHeader} from '^clients/private/orgs/settings/integrations/slack/OrgIntegrationSlackWorkspaceDetailPage/SlackWorkspaceDetailPageHeader';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';
import {slackWorkspaceDetailPageTab} from './slackWorkspaceDetailPageTab';

export const OrgIntegrationSlackWorkspaceDetailPage = memo(function OrgIntegrationSlackWorkspaceDetailPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const workspaceId = useIdParam('slackWorkspaceId');
    const {data: workspace} = useSlackWorkspaceInDetailPage();
    const {TabNav, CurrentTabPane} = useTabs(slackWorkspaceDetailPageTab);

    return (
        <OrgSettingsLayout breadcrumbPath="Slack Workspace" activeMenuName="서비스 연동" clearBody>
            <div>
                {/* header */}
                <SlackWorkspaceDetailPageHeader />

                {/* tabs */}
                <TabNav />

                {/* tab-body */}
                <CurrentTabPane />
            </div>
        </OrgSettingsLayout>
    );
});
