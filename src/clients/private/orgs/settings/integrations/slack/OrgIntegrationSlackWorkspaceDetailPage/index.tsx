import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, useIdParam} from '^atoms/common';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {useTabs} from '^components/util/tabs';
import {SlackWorkspaceDetailPageHeader} from './SlackWorkspaceDetailPageHeader';
import {slackWorkspaceDetailPageTab} from './slackWorkspaceDetailPageTab';

export const OrgIntegrationSlackWorkspaceDetailPage = memo(function OrgIntegrationSlackWorkspaceDetailPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const workspaceId = useIdParam('slackWorkspaceId');
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
