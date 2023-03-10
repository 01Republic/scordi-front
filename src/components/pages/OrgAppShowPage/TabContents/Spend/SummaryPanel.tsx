import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';

export const SummaryPanel = memo(() => {
    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Summary</ContentPanelMiniTitle>
        </ContentPanel>
    );
});
