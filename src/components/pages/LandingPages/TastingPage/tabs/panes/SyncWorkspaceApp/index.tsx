import React, {memo} from 'react';

import {useRecoilValue} from 'recoil';
import {ReportList} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/ReportList';
import {SyncWorkspaceAppStartBody} from './SyncWorkspaceAppStartBody';
import {ReportLoadingStatus, reportLoadingStatus, reportState} from './atom';
import {useTranslation} from 'react-i18next';
import {Loading} from './Loading';

export const SyncWorkspaceApp = memo(function SyncWorkspaceApp() {
    const {t} = useTranslation('publicTasting');

    const loadingStatus = useRecoilValue(reportLoadingStatus);

    return (
        <div>
            <div className="">
                <section id="section-1" className="hero mb-3">
                    <div className="text-left w-[100vw]">
                        <div className="my-10 container px-4 relative">
                            {loadingStatus === ReportLoadingStatus.Loading && <SyncWorkspaceAppStartBody />}
                            {loadingStatus === ReportLoadingStatus.NotLoaded && <Loading />}
                            {loadingStatus === ReportLoadingStatus.Loaded && <ReportList />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});
