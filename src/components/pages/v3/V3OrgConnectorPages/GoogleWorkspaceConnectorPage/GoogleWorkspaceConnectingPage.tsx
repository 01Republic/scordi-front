import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {FaArrowLeft} from 'react-icons/fa6';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {LinkTo} from '^components/util/LinkTo';
import {googleWorkspaceAccessTokenAtom, isLoadedState, reportState} from './atom';
import {userSocialGoogleApi} from '^api/social-google.api';
import {workspaceTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectGoogleAdminIsLoading/workspaceTimeoutChain';
import {filterBlackList} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/features';

export const GoogleWorkspaceConnectingPage = memo(function GoogleWorkspaceConnectPage() {
    const [accessToken, setAccessToken] = useRecoilState(googleWorkspaceAccessTokenAtom);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('15초 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const setReportData = useSetRecoilState(reportState);
    const [isLoading, setIsLoading] = useRecoilState(isLoadedState);
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;

    const routerBack = () => {
        setIsLoading(false);
        setAccessToken(null);
    };

    const getReport = (token: string) => {
        setIsLoading((loading) => {
            if (!loading) {
                workspaceTimeoutChain(setTitle, setDesc);
                const req = googleUsageReportApi.draft(token);
                req.then((res) => {
                    if (!res.data) return;
                    const filteredReport = filterBlackList(res.data);
                    filteredReport.setNonameMember();
                    setReportData(filteredReport);
                });
            }
            return true;
        });
    };

    useEffect(() => {
        if (accessToken) getReport(accessToken);
    }, [accessToken]);

    return (
        <div className="py-10 px-12">
            <header className="mb-12">
                <div className="mb-12">
                    <LinkTo
                        onClick={routerBack}
                        className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                    >
                        <FaArrowLeft /> 뒤로가기
                    </LinkTo>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <img
                        src="https://fonts.gstatic.com/s/i/productlogos/admin_2020q4/v6/192px.svg"
                        alt="google workspace logo"
                        className="avatar w-[48px] h-[48px] bg-white"
                    />
                </div>

                <div className="mb-12 animate-pulse">
                    <h1 className="text-3xl mb-4">{title}</h1>
                    <h2 className="text-xl mb-4">{desc}</h2>

                    <br />
                </div>
            </header>

            <section className="py-8">
                <PiSpinnerGapThin size={60} className="animate-spin text-scordi-500 m-auto" />
            </section>
        </div>
    );
});
