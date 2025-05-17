import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import LoadingScreen from '../../subscriptions/connection-steps/common/LoadingScreen';
import {ErrorScreen} from '../ErrorScreen';
import {ConnectingResultScreen, NewMember} from '../ConnectingResultScreen';
import {useExcelUpload} from './useExcelUpload';
import {ExcelBeforeConnectPage} from './ExcelBeforeConnectPage';

export const ExcelConnectorPage = memo(function ExcelConnectorPage() {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {state, uploadExcel, resetState} = useExcelUpload(orgId);
    const [newMembers, setNewMembers] = useState<NewMember[]>([]);

    const handleSubmit = (file: File) => {
        uploadExcel(file)
            .then((members) => {
                setNewMembers(
                    members.map((member) => ({
                        name: member.name,
                        email: member.email || '',
                    })),
                );
            })
            .catch((error) => {
                console.error('엑셀 업로드 실패:', error);
            });
    };

    if (state.errorMsg) {
        return <ErrorScreen errorMsg={state.errorMsg} onReset={resetState} />;
    }

    if (state.isComplete) {
        return (
            <ConnectingResultScreen
                onNext={() => router.push(OrgOnboardingRequestPageRoute.path(orgId))}
                newMembers={newMembers}
            />
        );
    }

    if (state.isLoading) {
        return (
            <div className="h-lvh flex flex-col items-center justify-center">
                <LoadingScreen
                    message="입력한 정보를 기반으로\n구성원을 불러오고 있어요"
                    onComplete={() => {
                        const {state: currentState} = useExcelUpload(orgId);
                        currentState.isLoading = false;
                        currentState.isComplete = true;
                    }}
                />
            </div>
        );
    }

    return <ExcelBeforeConnectPage onSubmit={handleSubmit} />;
});
