import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {DisConnectPanel} from '../information/DisConnectPanel';

export const SettingsPanel = memo(() => {
    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Settings</ContentPanelMiniTitle>
        </ContentPanel>
    );
});
