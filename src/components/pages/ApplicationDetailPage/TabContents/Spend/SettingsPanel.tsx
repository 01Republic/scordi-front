import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';

export const SettingsPanel = memo(() => {
    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Settings</ContentPanelMiniTitle>
        </ContentPanel>
    );
});
