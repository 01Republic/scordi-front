import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {googleWorkspaceAccessTokenAtom, reportState} from './atom';
import {GoogleWorkspaceBeforeConnectPage} from './GoogleWorkspaceBeforeConnectPage';
import {GoogleWorkspaceConnectingPage} from './GoogleWorkspaceConnectingPage';
import {ConnectingMemberAndSubscription} from '^clients/private/orgs/onboarding/OrgOnboardingMembersPage/ConnectingMemberAndSubscription';

export const GoogleWorkspaceConnectorPage = memo(function GoogleWorkspaceConnectorPage() {
    const accessToken = useRecoilValue(googleWorkspaceAccessTokenAtom);
    const reportData = useRecoilValue(reportState);

    if (reportData) {
        return <ConnectingMemberAndSubscription />;
    }

    if (accessToken) {
        return <GoogleWorkspaceConnectingPage />;
    }

    return <GoogleWorkspaceBeforeConnectPage />;
});
