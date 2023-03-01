import {memo} from 'react';
import {DangerPanel} from './Spend/DangerPanel';
import {SettingsPanel} from './Spend/SettingsPanel';

export const TabContentForSettings = memo(() => {
    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <SettingsPanel />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col-4 px-0">
                    <DangerPanel />
                </div>
            </div>
        </div>
    );
});
