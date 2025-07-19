import {memo} from 'react';
import {OrgSettingsLayout} from '^clients/private/_layouts/OrgSettingsLayout';
import {useTabs} from '^components/util/tabs';

import {GoogleWorkspaceDetailPageHeader} from './GoogleWorkspaceDetailPageHeader';
import {useTranslation} from 'next-i18next';
import {useGoogleWorkspaceDetailPageTab} from './googleWorkspaceDetailPageTab';

export const OrgIntegrationGoogleWorkspaceDetailPage = memo(function OrgIntegrationGoogleWorkspaceDetailPage() {
    const {TabNav, CurrentTabPane} = useTabs(useGoogleWorkspaceDetailPageTab());
    const {t} = useTranslation('integrations');

    return (
        <OrgSettingsLayout
            breadcrumbPath={t('googleWorkspace') as string}
            activeMenuName={t('serviceIntegration') as string}
            clearBody
        >
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
