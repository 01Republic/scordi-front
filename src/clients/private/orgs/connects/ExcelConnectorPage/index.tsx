import {orgIdParamState} from '^atoms/common';
import {TeamMemberDto} from '^models/TeamMember/type';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import {useRouter} from 'next/router';
import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import LoadingScreen from '../../subscriptions/connection-steps/selectInstitutionsSection/ByCertificatePage/LoadingScreen';
import {ConnectingResultScreen} from '../ConnectingResultScreen';
import {ErrorScreen} from '../ErrorScreen';
import {ExcelBeforeConnectPage} from './ExcelBeforeConnectPage';
import {useExcelUpload} from './useExcelUpload';

export const ExcelConnectorPage = memo(function ExcelConnectorPage() {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {state, uploadExcel, resetState} = useExcelUpload(orgId);
    const [newMembers, setNewMembers] = useState<TeamMemberDto[]>([]);

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
            <LoadingScreen
                message="입력한 정보를 기반으로\n구성원을 불러오고 있어요"
                onComplete={() => {
                    const {state: currentState} = useExcelUpload(orgId);
                    currentState.isLoading = false;
                    currentState.isComplete = true;
                }}
            />
        );
    }

    const handleSubmit = (file: File) => {
        uploadExcel(file)
            .then((members) => {
                setNewMembers(members);
            })
            .catch((error) => {
                console.error('엑셀 업로드 실패:', error);
            });
    };

    return <ExcelBeforeConnectPage onSubmit={handleSubmit} />;
});
