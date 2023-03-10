import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {DisConnectPanel} from '../information/DisConnectPanel';

export const DangerPanel = memo(() => {
    return (
        <ContentPanel>
            <ContentPanelMiniTitle>DangerZone</ContentPanelMiniTitle>
            <DisConnectPanel />
        </ContentPanel>
    );
});
