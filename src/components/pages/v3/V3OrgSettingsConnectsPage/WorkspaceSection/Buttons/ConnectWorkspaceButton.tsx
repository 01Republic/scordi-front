import React, {memo} from 'react';
import {WorkspaceConnectButton} from '^v3/share/GoogleLoginButtons/WorkspaceConnectButton';
import {ConnectButton} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/ConnectButton';
import {useSetRecoilState} from 'recoil';
import {isWorkspaceConnectLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';

export const ConnectWorkspaceButtonInSettings = memo(() => {
    const setIsLoading = useSetRecoilState(isWorkspaceConnectLoadingAtom);

    return <WorkspaceConnectButton ButtonComponent={() => <ConnectButton />} setIsLoading={setIsLoading} />;
});
