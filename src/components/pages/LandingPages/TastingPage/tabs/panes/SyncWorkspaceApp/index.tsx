import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useTranslation} from 'next-i18next';
import {SignPhoneAuthPageRoute} from '^pages/sign/phone';
import {LinkTo} from '^components/util/LinkTo';
import {ReportLoadingStatus, reportLoadingStatus, reportState} from './atom';
import {Loading} from './Loading';
import {SyncWorkspaceAppStartBody} from './SyncWorkspaceAppStartBody';
import {SyncWorkspaceAppLoadedBody} from './SyncWorkspaceAppLoadedBody';
import {ReportItemModal} from './results/ReportItemModal';
import {ReportMemberItemModal} from './results/ReportMemberItemModal';
import {NewReportItemModal} from './results/NewReportItemModal';

export const SyncWorkspaceApp = memo(function SyncWorkspaceApp() {
    const loadingStatus = useRecoilValue(reportLoadingStatus);
    const {t} = useTranslation('publicTasting');
    const reportList = useRecoilValue(reportState);

    const onCtaClick = () => {
        if (!reportList) return;
        window.localStorage.setItem('report', JSON.stringify(reportList));
    };

    return (
        <>
            <div className="">
                <section id="section-1" className="hero mb-3">
                    <div className="text-left w-[100vw]">
                        <div className="my-10 container px-4 relative">
                            {loadingStatus === ReportLoadingStatus.NotLoaded && <SyncWorkspaceAppStartBody />}
                            {loadingStatus === ReportLoadingStatus.Loading && <Loading />}
                            {loadingStatus === ReportLoadingStatus.Loaded && <SyncWorkspaceAppLoadedBody />}
                        </div>
                    </div>
                </section>
            </div>

            {/* CTA */}
            {loadingStatus === ReportLoadingStatus.Loaded && (
                <div className="text-center mt-10 fixed bottom-0 w-full left-0 p-4 z-20 bg-white">
                    <LinkTo
                        onClick={onCtaClick}
                        href={SignPhoneAuthPageRoute.path()}
                        className="btn btn-scordi-500 btn-block btn-lg rounded-2xl shadow-xl"
                    >
                        {t('try_it_free_now')}
                    </LinkTo>
                </div>
            )}

            {/* Modals */}
            {loadingStatus === ReportLoadingStatus.Loaded && <ReportItemModal />}
            {loadingStatus === ReportLoadingStatus.Loaded && <ReportMemberItemModal />}
            {loadingStatus === ReportLoadingStatus.Loaded && <NewReportItemModal />}
        </>
    );
});
