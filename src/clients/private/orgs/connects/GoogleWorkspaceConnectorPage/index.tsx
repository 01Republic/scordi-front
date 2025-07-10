import {memo, useState} from 'react';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {ConnectingMemberAndSubscription} from '../../onboarding/OrgOnboardingMembersPage/ConnectingMemberAndSubscription';
import {GoogleWorkspaceBeforeConnectPage} from './GoogleWorkspaceBeforeConnectPage';
import {GoogleWorkspaceConnectingPage} from './GoogleWorkspaceConnectingPage';

// 온보딩 스텝2. / 구글워크스페이스 연동 / 시작 페이지
export const GoogleWorkspaceConnectorPage = memo(function GoogleWorkspaceConnectorPage() {
    const [code, setCode] = useState<string>();
    const [createdWorkspace, setCreatedWorkspace] = useState<IntegrationGoogleWorkspaceWorkspaceDto>();

    if (!code) return <GoogleWorkspaceBeforeConnectPage onCode={setCode} />; // before

    if (!createdWorkspace) {
        return (
            <GoogleWorkspaceConnectingPage code={code} onBack={() => setCode(undefined)} onNext={setCreatedWorkspace} />
        ); // ing
    }

    return <ConnectingMemberAndSubscription workspace={createdWorkspace} onBack={() => setCode(undefined)} />; // done
});
