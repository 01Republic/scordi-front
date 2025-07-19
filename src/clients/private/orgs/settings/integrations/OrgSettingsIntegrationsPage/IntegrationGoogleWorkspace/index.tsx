import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import GoogleWorkspaceLogo from '^public/images/logo/external/logo_google_workspace.png';
import {OrgIntegrationGoogleWorkspaceDetailPageRoute} from '^pages/orgs/[id]/settings/integrations/google-workspace/[workspaceId]';
import {IntegrationProviderItemButton} from '^clients/private/orgs/settings/integrations/OrgSettingsIntegrationsPage/IntegrationProviderItem/IntegrationProviderItemButton';
import {integrationGoogleWorkspaceWorkspaceApi} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/api';
import {IntegrationProvider, IntegrationWorkspaceDto} from '^models/IntegrationWorkspace/type';
import {GoogleAdminOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {IntegrationProviderItem} from '../IntegrationProviderItem';
import {useTranslation} from 'next-i18next';

interface IntegrationGoogleWorkspaceProps {
    config: IntegrationWorkspaceDto<IntegrationProvider.googleWorkspace> | undefined;
    reload: () => any;
}

export const IntegrationGoogleWorkspace = memo((props: IntegrationGoogleWorkspaceProps) => {
    const {config, reload} = props;
    const orgId = useOrgIdParam();
    const [isCreating, setIsCreating] = useState(false);
    const {t} = useTranslation('integrations');

    const onCode = (code: string) => {
        setIsCreating(true);
        integrationGoogleWorkspaceWorkspaceApi
            .create(orgId, {code})
            .then((res) => res.data)
            .then((workspace) => {
                toast.success(
                    t('workspaceConnected', {
                        workspaceName: workspace.workspaceName,
                        defaultValue: `워크스페이스(@${workspace.workspaceName})를 연동했어요!`,
                    }),
                );
            })
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsCreating(false));
    };

    return (
        <IntegrationProviderItem
            id="google-workspace"
            name={t('googleWorkspace') as string}
            logo={GoogleWorkspaceLogo}
            disabled={isCreating}
            isInstalled={!!config}
        >
            {config ? (
                <IntegrationProviderItemButton
                    isInstalled
                    href={OrgIntegrationGoogleWorkspaceDetailPageRoute.path(config.organizationId, config.id)}
                />
            ) : (
                <GoogleAdminOAuthButton onCode={onCode}>
                    <IntegrationProviderItemButton isLoading={isCreating} />
                </GoogleAdminOAuthButton>
            )}
        </IntegrationProviderItem>
    );
});
IntegrationGoogleWorkspace.displayName = 'IntegrationGoogleWorkspace';
