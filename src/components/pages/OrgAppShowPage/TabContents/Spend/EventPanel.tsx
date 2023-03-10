import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';

export const EventPanel = memo(() => {
    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Events</ContentPanelMiniTitle>
        </ContentPanel>
    );
});
