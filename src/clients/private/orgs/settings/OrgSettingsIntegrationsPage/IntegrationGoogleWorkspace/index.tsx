import {memo} from 'react';
import GoogleWorkspaceLogo from '^public/images/logo/external/logo_google_workspace.png';
import {IntegrationProviderItem} from '../IntegrationProviderItem';

interface IntegrationGoogleWorkspaceProps {
    //
}

export const IntegrationGoogleWorkspace = memo((props: IntegrationGoogleWorkspaceProps) => {
    const {} = props;

    const isInstalled = true;

    const install = () => {
        //
    };

    const setting = () => {
        //
    };

    return (
        <IntegrationProviderItem
            id="google-workspace"
            name="구글 워크스페이스"
            logo={GoogleWorkspaceLogo}
            isInstalled={isInstalled}
            onClick={setting}
            install={install}
            onAuthorized={async (data) => {
                //
            }}
        />
    );
});
IntegrationGoogleWorkspace.displayName = 'IntegrationGoogleWorkspace';
