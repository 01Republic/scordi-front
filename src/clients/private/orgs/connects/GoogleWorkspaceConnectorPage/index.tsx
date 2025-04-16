import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {googleWorkspaceAccessTokenAtom, reportState} from './atom';
import {GoogleWorkspaceBeforeConnectPage} from './GoogleWorkspaceBeforeConnectPage';
import {GoogleWorkspaceConnectingPage} from './GoogleWorkspaceConnectingPage';
import {GoogleWorkspaceSaveConnectPage} from './GoogleWorkspaceSaveConnectPage';

export const GoogleWorkspaceConnectorPage = memo(function GoogleWorkspaceConnectorPage() {
    const accessToken = useRecoilValue(googleWorkspaceAccessTokenAtom);
    const reportData = useRecoilValue(reportState);

    return (
        <div>
            {reportData ? (
                <GoogleWorkspaceSaveConnectPage />
            ) : accessToken ? (
                <GoogleWorkspaceConnectingPage />
            ) : (
                <GoogleWorkspaceBeforeConnectPage />
            )}
        </div>
    );
});
