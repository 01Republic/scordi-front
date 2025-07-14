import {memo} from 'react';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {useTabs} from '^components/util/tabs';
import {googleWorkspaceDetailPageTab} from './googleWorkspaceDetailPageTab';
import {GoogleWorkspaceDetailPageHeader} from './GoogleWorkspaceDetailPageHeader';

export const OrgIntegrationGoogleWorkspaceDetailPage = memo(function OrgIntegrationGoogleWorkspaceDetailPage() {
    const {TabNav, CurrentTabPane} = useTabs(googleWorkspaceDetailPageTab);

    return (
        <OrgSettingsLayout breadcrumbPath="Google Workspace" activeMenuName="서비스 연동" clearBody>
            <div>
                {/* header */}
                <GoogleWorkspaceDetailPageHeader />

                {/* tabs */}
                <TabNav />

                {/* tab-body */}
                <CurrentTabPane />
            </div>
        </OrgSettingsLayout>
    );
});
