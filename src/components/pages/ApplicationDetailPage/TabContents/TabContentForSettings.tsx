import {memo} from 'react';
import {SummaryPanel} from './Spend/SummaryPanel';
import {DangerPanel} from './Spend/DangerPanel';

export const TabContentForSettings = memo(() => {
    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    {/* TODO : settings 항목들 추가하기 */}
                    <SummaryPanel />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col-4 px-0">
                    <DangerPanel />
                </div>
            </div>
        </div>
    );
});
