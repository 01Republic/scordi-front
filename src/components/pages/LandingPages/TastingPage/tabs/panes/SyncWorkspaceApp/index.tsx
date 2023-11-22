import React, {memo} from 'react';

import {useRecoilValue} from 'recoil';
import {reportState} from '^components/pages/LandingPages/TastingPage/tabs/atom';
import {ReportList} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/ReportList';
import {SyncWorkSpace} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/SyncWorkSpace';

export const SyncWorkspaceApp = memo(function SyncWorkspaceApp() {
    const reportList = useRecoilValue(reportState);

    return (
        <div>
            <div className="">
                <section id="section-1" className="hero mb-3">
                    <div className="text-left w-[100vw]">
                        <div className="my-10 container px-4 relative">
                            {reportList ? <ReportList /> : <SyncWorkSpace />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
