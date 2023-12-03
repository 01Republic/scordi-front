import {memo, useEffect, useState} from 'react';
import {StepContentProps} from '^components/util/funnel';
import {Container} from '../../Container';
import {googleAccessTokenAtom} from '^components/pages/UsersLogin/atom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {userSocialGoogleApi} from '^api/social-google.api';
import {reportState} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/atom';
import {filterBlackList} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/features';
import {useAlert} from '^hooks/useAlert';
import {workspaceTimeoutChain} from '^v3/share/OnboardingFlow/steps/ConnectGoogleAdminIsLoading/workspaceTimeoutChain';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const ConnectGoogleAdminIsLoading = memo(function ConnectGoogleAdminIsLoading(props: Props) {
    const accessToken = useRecoilValue(googleAccessTokenAtom);
    const setReportData = useSetRecoilState(reportState);
    const [title, setTitle] = useState('인증 정보를 가져오고 있어요.');
    const [desc, setDesc] = useState('15초 정도 걸릴 수 있어요. 잠시만 기다려주세요.');
    const {alert} = useAlert();
    const {onNext} = props;
    const {usageReport: googleUsageReportApi} = userSocialGoogleApi.subscriptions;

    const getReport = (token: string) => {
        const req = googleUsageReportApi.draft(token);

        workspaceTimeoutChain(setTitle, setDesc);

        req.then((res) => {
            if (!res.data) return;
            const filteredReport = filterBlackList(res.data);
            filteredReport.setNonameMember();
            setReportData(filteredReport);
            onNext();
        });

        req.catch((e) => {
            if (e.response.data.code == 'Unauthorized') {
                alert.error('회사 대표 계정으로 시도해주세요', '', {
                    html: `
                    ex) official@scordi.io
                    `,
                });
            } else {
                alert.error('다시 시도해주세요', e.response.data.message);
            }
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
