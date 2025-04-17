import {orgIdParamState} from '^atoms/common';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import {useRouter} from 'next/router';
import {memo} from 'react';
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

    if (state.errorMsg) {
        return <ErrorScreen errorMsg={state.errorMsg} onReset={resetState} />;
    }

    if (state.isComplete) {
        return <ConnectingResultScreen onNext={() => router.push(OrgOnboardingRequestPageRoute.path(orgId))} />;
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

    return <ExcelBeforeConnectPage onSubmit={uploadExcel} />;
});
