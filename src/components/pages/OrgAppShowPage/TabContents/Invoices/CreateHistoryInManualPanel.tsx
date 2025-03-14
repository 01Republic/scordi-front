import {memo} from 'react';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {Pencil, Upload, Zap} from 'lucide-react';

export const CreateHistoryInManualPanel = memo(() => {
    return (
        <div className="sticky top-[80px]">
            <ContentPanel>
                <ContentPanelMiniTitle>Actions</ContentPanelMiniTitle>

                <div className="flex flex-col gap-2">
                    <button className="btn2 btn-secondary btn-outline flex-1 gap-2">
                        <Upload size={20} />
                        Add by invoice file
                    </button>
                    <button className="btn2 btn-secondary btn-outline flex-1 gap-2">
                        <Pencil size={20} />
                        Add in manual
                    </button>
                    <button className="btn btn-secondary flex-1 capitalize gap-2">
                        <Zap size={20} />
                        Start syncing
                    </button>
                </div>
            </ContentPanel>
        </div>
    );
});
