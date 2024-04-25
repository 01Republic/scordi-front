import {memo, useEffect, useState} from 'react';
import {StepContentProps, useFunnel} from '^components/util/funnel';
import {Container} from '../../Container';
import {googleAccessTokenAtom} from '^components/pages/UsersLogin/atom';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {userSocialGoogleApi} from '^api/social-google.api';
import {reportState} from '^tasting/tabs/panes/SyncWorkspaceApp/atom';
import {filterBlackList} from '^tasting/tabs/panes/SyncWorkspaceApp/features';
import {useAlert} from '^hooks/useAlert';
import {workspaceTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectGoogleAdminIsLoading/workspaceTimeoutChain';
import {isLoadedState, ONBOARDING_STEP, onboardingFlowStepStatus} from '^v3/share/OnboardingFlow/atom';

interface Props extends StepContentProps {
    // onNext: () => any;
}

/** 온보딩 프로세스의 구글워크스페이스 연동 */
export const ConnectGoogleAdminIsLoading = memo(function ConnectGoogleAdminIsLoading(props: Props) {
    const accessToken = useRecoilValue(googleAccessTokenAtom);
    const setReportData = useSetRecoilState(reportState);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('15초 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
    const {alert} = useAlert();
    const {setStep} = useFunnel(onboardingFlowStepStatus);

    const {onNext} = props;
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;

    const getReport = (token: string) => {
        setIsLoaded(true);
        const req = googleUsageReportApi.draft(token);

        workspaceTimeoutChain(setTitle, setDesc);

        req.then((res) => {
            if (!res.data) return;
            const filteredReport = filterBlackList(res.data);
            filteredReport.setNonameMember();
            setReportData(filteredReport);
            onNext();
            setIsLoaded(false);
        });

        req.catch((e) => {
            setStep(ONBOARDING_STEP.Workspace.beforeLoad);

            if (e.response.data.code == 'Forbidden') {
                return alert.error('회사 대표 계정으로 시도해주세요', '', {
                    html: `
                    ex) official@scordi.io
                    `,
                });
            }
            return alert.error('관리자 계정 연결이 필요해요', '회사 공식 메일로 워크스페이스를 연동해주세요');
        });
    };

    useEffect(() => {
        if (accessToken) getReport(accessToken);
    }, [accessToken]);

    return (
        <div data-step="ConnectGoogleAdmin" className="h-full flex flex-col gap-7 animate-pulse">
            <Container size="md">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-3">{title}</h3>
                    <p className="text-16 text-gray-500">{desc}</p>
                </div>
            </Container>

            <Container size="sm" className="flex justify-center py-8">
                <PiSpinnerGapThin size={60} className="animate-spin text-scordi-500 m-auto" />
            </Container>
        </div>
    );
});
