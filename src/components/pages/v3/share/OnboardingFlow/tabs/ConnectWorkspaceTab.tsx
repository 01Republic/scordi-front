import {memo} from 'react';
import {OnboardingStep} from '../atom';
import {StepTab} from './StepTab';
import {useRecoilValue} from 'recoil';
import {reportState} from '^tasting/tabs/panes/SyncWorkspaceApp/atom';

export const ConnectWorkspaceTab = memo(function ConnectWorkspaceTab() {
    const reportData = useRecoilValue(reportState);

    const {
        ConnectWorkspace_BeforeLoad: BeforeLoad,
        ConnectWorkspace_IsLoading: IsLoading,
        ConnectWorkspace_AfterLoad: AfterLoad,
    } = OnboardingStep;

    return (
        <StepTab
            steps={[BeforeLoad, IsLoading, AfterLoad]}
            num={1}
            checked={!!reportData}
            defaultStep={reportData ? AfterLoad : BeforeLoad}
            available
        >
            <div>구글 워크스페이스 연동</div>
        </StepTab>
    );
});
