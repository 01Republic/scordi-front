import {memo} from 'react';
import {LogoHeader} from './LogoHeader';
import {SelectedAppsSection} from './SelectedAppsSection';
import {Inquiry} from './Inquiry';

export const LeftAppsStatusPanel = memo(function LeftAppsStatusPanel() {
    return (
        <aside className="w-[400px] bg-gray-50 flex flex-col items-stretch relative max-h-screen">
            <div className="pt-10 pb-14 px-10">
                <LogoHeader />
            </div>
            <div className="px-10 py-2 flex-auto overflow-scroll">
                <SelectedAppsSection />
            </div>
            <div className="py-4 px-10">
                <Inquiry />
            </div>
        </aside>
    );
});
