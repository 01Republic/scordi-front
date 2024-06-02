import {memo} from 'react';
import {LogoHeader} from './LogoHeader';
import {SelectedAppsSection} from './SelectedAppsSection';
import {Inquiry} from './Inquiry';

export const LeftAppsStatusPanel = memo(function LeftAppsStatusPanel() {
    return (
        <aside className="w-full max-w-[400px] min-w-[250px] bg-gray-50 relative min-h-screen">
            <div className="pt-10 pb-14 px-10">
                <LogoHeader />
            </div>
            <div
                className="px-10 py-2 flex-auto overflow-scroll no-scrollbar"
                style={{
                    height: 'calc(100vh - 114px - 178px)',
                }}
            >
                <SelectedAppsSection />
            </div>
            <div className="py-4 px-10 sticky bottom-0">
                <Inquiry />
            </div>
        </aside>
    );
});
