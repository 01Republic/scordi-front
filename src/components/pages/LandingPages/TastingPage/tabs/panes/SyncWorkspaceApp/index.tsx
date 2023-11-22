import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ReportList} from './ReportList';
import {SyncWorkspaceAppStartBody} from './SyncWorkspaceAppStartBody';
import {ReportLoadingStatus, reportLoadingStatus, reportState} from './atom';

export const SyncWorkspaceApp = memo(function SyncWorkspaceApp() {
    const reportList = useRecoilValue(reportState);
    const loadingStatus = useRecoilValue(reportLoadingStatus);

    return (
        <div>
            <div className="">
                <section id="section-1" className="hero mb-3">
                    <div className="text-left w-[100vw]">
                        <div className="my-10 container px-4 relative">
                            {loadingStatus === ReportLoadingStatus.NotLoaded && <SyncWorkspaceAppStartBody />}
                            {loadingStatus === ReportLoadingStatus.Loading && <span>loading ...</span>}
                            {loadingStatus === ReportLoadingStatus.Loaded && <ReportList />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
