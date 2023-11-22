import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ReportLoadingStatus, reportLoadingStatus, reportState} from './atom';
import {ReportList} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/ReportList';
import {Loading} from './Loading';
import {SyncWorkspaceAppStartBody} from './SyncWorkspaceAppStartBody';

export const SyncWorkspaceApp = memo(function SyncWorkspaceApp() {
    const loadingStatus = useRecoilValue(reportLoadingStatus);

    return (
        <div>
            <div className="">
                <section id="section-1" className="hero mb-3">
                    <div className="text-left w-[100vw]">
                        <div className="my-10 container px-4 relative">
                            {loadingStatus === ReportLoadingStatus.NotLoaded && <SyncWorkspaceAppStartBody />}
                            {loadingStatus === ReportLoadingStatus.Loading && <Loading />}
                            {loadingStatus === ReportLoadingStatus.Loaded && <ReportList />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
