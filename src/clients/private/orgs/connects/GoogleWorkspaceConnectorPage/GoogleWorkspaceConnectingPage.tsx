import React, {memo, useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ApiError} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {Sequence, SequenceStep} from '^utils/TypeWritter/Sequence';
import {WithLoopText} from '^utils/TypeWritter';
import {integrationGoogleWorkspaceWorkspaceApi} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/api';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {LoadingScreen2} from '^clients/private/_components/pages/assets/connect-steps/common/LoadingScreen';
import {ConnectingFailurePage} from '^clients/private/orgs/onboarding/OrgOnboardingMembersPage/ConnectingFailurePage';

interface Props {
    code: string;
    onBack: () => any;
    onNext: (workspace?: IntegrationGoogleWorkspaceWorkspaceDto) => any;
}

// 온보딩 스텝2. / 구글워크스페이스 연동 / 연동중 상태화면
export const GoogleWorkspaceConnectingPage = memo(function GoogleWorkspaceConnectPage(props: Props) {
    const {code, onBack, onNext} = props;
    const orgId = useOrgIdParam();
    const [progress, setProgress] = useState(0);
    const {data, error} = useQuery<IntegrationGoogleWorkspaceWorkspaceDto, ApiError>({
        queryKey: ['createGoogleWorkspace', code],
        queryFn: () => {
            return integrationGoogleWorkspaceWorkspaceApi.create(orgId, {code}).then((res) => res.data);
        },
        enabled: !!code,
        initialData: undefined,
        retry: 1,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) onNext(data);
    }, [data]);

    if (error) {
        if (error.response?.data) {
            const apiErrObj = error.response?.data;

            if (apiErrObj.message && apiErrObj.message.includes('Invalid grant')) {
                return (
                    <ConnectingFailurePage
                        title="입력하신 계정을 확인해주세요"
                        desc="Google Workspace 에서 확인되지 않는 계정이에요."
                        onBack={onBack}
                    />
                );
            }

            if (apiErrObj.code === 'Forbidden') {
                return (
                    <ConnectingFailurePage
                        title="관리자 계정 권한이 필요해요"
                        desc="구글 워크스페이스 관리콘솔에서 최고 관리자 권한이 부여된 계정으로 시도해주세요"
                        onBack={onBack}
                    />
                );
            }

            if (apiErrObj.status === 400 && apiErrObj.code === 'Bad Request') {
                if (apiErrObj.message.includes('Invalid Input')) {
                    return (
                        <ConnectingFailurePage
                            title="입력하신 계정을 확인해주세요"
                            desc="구글 워크스페이스 관리콘솔에서 최고 관리자 권한이 부여된 계정으로 시도해주세요"
                            onBack={onBack}
                        />
                    );
                }
            }

            return <ConnectingFailurePage title="알 수 없는 에러 발생" onBack={onBack} />;
        } else {
            return <ConnectingFailurePage title="알 수 없는 에러 발생" onBack={onBack} />;
        }
    }

    const percentage = progress === 0 ? 0 : Math.round((progress / 40000) * 100);
    console.log(40000, {progress, percentage});

    return (
        <LoadingScreen2
            message={(() => (
                <Sequence
                    steps={[
                        (props) => (
                            <SequenceStep delay={2500} {...props} onNext={() => setProgress(2.5 * 1000)}>
                                <WithLoopText text="구성원 정보를 불러오고 있어요" absolute />
                            </SequenceStep>
                        ), // 2.5s
                        (props) => (
                            <SequenceStep delay={4500} {...props} onNext={() => setProgress(7 * 1000)}>
                                <WithLoopText text="조금만 기다려 주세요. 새로고침하면 처음부터 해야 해요!" absolute />
                            </SequenceStep>
                        ), // 7s
                        (props) => (
                            <SequenceStep delay={5000} {...props} onNext={() => setProgress(12 * 1000)}>
                                <WithLoopText text="구독 서비스를 불러오고 있어요" absolute />
                            </SequenceStep>
                        ), // 12s
                        (props) => (
                            <SequenceStep delay={4000} {...props} onNext={() => setProgress(16 * 1000)}>
                                <WithLoopText text="거의 다 가져왔어요" absolute />
                            </SequenceStep>
                        ), // 16s
                        (props) => (
                            <SequenceStep delay={3000} {...props} onNext={() => setProgress(19 * 1000)}>
                                <WithLoopText text="마지막으로 권한을 확인하고 있어요" absolute />
                            </SequenceStep>
                        ), // 19s
                        (props) => (
                            <SequenceStep delay={8000} {...props} onNext={() => setProgress(27 * 1000)}>
                                <WithLoopText text="데이터를 정리하고 있어요" absolute />
                            </SequenceStep>
                        ), // 27s
                        (props) => (
                            <SequenceStep delay={13000} {...props} onNext={() => setProgress(40 * 1000)}>
                                <WithLoopText text="거의 다 마쳤어요 잠시만 기다려주세요" absolute />
                            </SequenceStep>
                        ), // 40s
                    ]}
                />
            ))()}
            percentage={percentage}
            // onFinish={() => onNext(createdAccountIds, failedCompanies, results)}
            minTimeout={3 * 1000}
        />
    );
});
