import React, {memo} from 'react';
import {EventPanel} from './Spend/EventPanel';
import {SummaryPanel} from './Spend/SummaryPanel';

export const TabContentForHistories = memo(() => {
    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <SummaryPanel />
                    {/*  Monthly Active Usage  */}
                    {/*  Active Users List  */}
                </div>
                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col-4 px-0">
                    {/* Next Billing */}
                    <EventPanel />
                </div>
            </div>
        </div>
    );
});
