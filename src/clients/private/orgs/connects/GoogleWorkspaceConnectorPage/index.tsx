import {orgIdParamState} from '^atoms/common';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ConnectingResultScreen, NewMember} from '../ConnectingResultScreen';
import {googleWorkspaceAccessTokenAtom, reportState} from './atom';
import {GoogleWorkspaceBeforeConnectPage} from './GoogleWorkspaceBeforeConnectPage';
import {GoogleWorkspaceConnectingPage} from './GoogleWorkspaceConnectingPage';

export const GoogleWorkspaceConnectorPage = memo(function GoogleWorkspaceConnectorPage() {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const accessToken = useRecoilValue(googleWorkspaceAccessTokenAtom);
    const reportData = useRecoilValue(reportState);

    const newMembers: NewMember[] =
        reportData?.memberList.map((member) => ({
            name: member.name,
            email: member.email,
        })) || [];

    if (reportData) {
        return (
            <ConnectingResultScreen
                onNext={() => router.push(OrgOnboardingRequestPageRoute.path(orgId))}
                newMembers={newMembers}
            />
        );
    }

    if (accessToken) {
        return <GoogleWorkspaceConnectingPage />;
    }

    return <GoogleWorkspaceBeforeConnectPage />;
});
