import {memo} from 'react';
import {atom, useRecoilValue} from 'recoil';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {googleWorkspaceAccessTokenAtom, reportState} from './atom';
import {GoogleWorkspaceBeforeConnectPage} from './GoogleWorkspaceBeforeConnectPage';
import {GoogleWorkspaceConnectingPage} from './GoogleWorkspaceConnectingPage';
import {GoogleWorkspaceSaveConnectPage} from './GoogleWorkspaceSaveConnectPage';

export const GoogleWorkspaceConnectorPage = memo(function GoogleWorkspaceConnectorPage() {
    const accessToken = useRecoilValue(googleWorkspaceAccessTokenAtom);
    const reportData = useRecoilValue(reportState);

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects}>
            {reportData ? (
                <GoogleWorkspaceSaveConnectPage />
            ) : accessToken ? (
                <GoogleWorkspaceConnectingPage />
            ) : (
                <GoogleWorkspaceBeforeConnectPage />
            )}
        </V3MainLayout>
    );
});
