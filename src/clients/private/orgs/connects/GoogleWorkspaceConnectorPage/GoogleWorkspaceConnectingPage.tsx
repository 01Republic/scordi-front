import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {ApiError} from '^api/api';
import {userSocialGoogleApi} from '^api/social-google.api';
import {orgIdParamState} from '^atoms/common';
import {googleWorkspaceAccessTokenAtom, isLoadedState, reportState} from './atom';
import {useAlert} from '^hooks/useAlert';
import {filterBlackList} from '^tasting/tabs/panes/SyncWorkspaceApp/features';
import {workspaceTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectGoogleAdminIsLoading/workspaceTimeoutChain';
import {LoadingScreen} from '^clients/private/_components/pages/assets/connect-steps/common/LoadingScreen';

export const GoogleWorkspaceConnectingPage = memo(function GoogleWorkspaceConnectPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const [accessToken, setAccessToken] = useRecoilState(googleWorkspaceAccessTokenAtom);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('15초 정도 걸릴 수 있어요. 잠시만 기다려주세요.');

    const setReportData = useSetRecoilState(reportState);
    const [isLoading, setIsLoading] = useRecoilState(isLoadedState);
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;
    const {alert} = useAlert();

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
                req.catch(async (e: ApiError) => {
                    console.log(e);
                    const apiErrObj = e.response?.data;
                    console.log('apiErrObj', apiErrObj);
                    let catched = false;
                    if (apiErrObj) {
                        if (apiErrObj.code === 'Forbidden') {
                            catched = true;
                            await alert.error2(
                                '관리자 계정 권한이 필요해요',
                                '구글 워크스페이스 관리콘솔에서 최고 관리자 권한이 부여된 계정으로 시도해주세요',
                            );
                        }
                        if (apiErrObj.status === 400 && apiErrObj.code === 'Bad Request') {
                            if (apiErrObj.message.includes('Invalid Input')) {
                                catched = true;
                                await alert.error2(
                                    '입력하신 계정을 확인해주세요',
                                    '구글 워크스페이스 관리콘솔에서 최고 관리자 권한이 부여된 계정으로 시도해주세요',
                                );
                            }
                        }
                    }
                    if (!catched) {
                        await alert.error2('관리자에게 문의해주세요', '', {
                            html: (
                                <>
                                    <div>
                                        <p>이 화면을 캡쳐해주시면 도움이 됩니다.</p>
                                        <p>
                                            [${apiErrObj?.status} ${apiErrObj?.code}] ${apiErrObj?.message}
                                        </p>
                                    </div>
                                </>
                            ),
                        });
                    }
                    routerBack();
                });
            }
            return true;
        });
    };

    useEffect(() => {
        if (accessToken) getReport(accessToken);
    }, [accessToken]);

    return (
        <LoadingScreen
            message={`입력한 정보를 기반으로 \n구성원을 불러오고 있어요`}
            onClose={() => {
                setIsLoading(false);
                setAccessToken(null);
            }}
        />
    );
});
