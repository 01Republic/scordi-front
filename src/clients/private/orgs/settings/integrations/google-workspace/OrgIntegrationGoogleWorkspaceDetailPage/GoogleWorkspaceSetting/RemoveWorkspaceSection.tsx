import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {integrationSlackWorkspaceApi} from '^models/integration/IntegrationSlackWorkspace/api';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {integrationGoogleWorkspaceWorkspaceApi} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/api';
import {useTranslation} from 'next-i18next';

interface RemoveWorkspaceSectionProps {
    workspace?: IntegrationGoogleWorkspaceWorkspaceDto;
    reload?: () => any;
}

export const RemoveWorkspaceSection = memo((props: RemoveWorkspaceSectionProps) => {
    const {workspace, reload} = props;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation('integrations');

    const request = async (orgId: number, id: number) => {
        return integrationGoogleWorkspaceWorkspaceApi.destroy(orgId, id);
    };

    const onClick = async () => {
        if (!workspace) return;
        const {id, organizationId} = workspace;
        const continueConfirm = () => {
            return confirm2(
                t('removeWorkspace') as string,
                <div>
                    <p>{t('continue')}</p>
                </div>,
            );
        };
        return confirmed(continueConfirm())
            .then(() => setIsLoading(true))
            .then(() => request(organizationId, id))
            .then(() => toast.success(t('deleted')))
            .then(() => router.push(OrgSettingsIntegrationsPageRoute.path(organizationId)))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="mb-6 flex flex-col gap-4">
            <h3 className="text-16">{t('removeWorkspace')}</h3>
            <div className="flex flex-col gap-1.5">
                <div className="text-14 text-gray-500">
                    {t('removeWorkspaceDesc1', {workspaceName: workspace?.workspaceName})}
                </div>
                <div className="text-14 text-gray-500" dangerouslySetInnerHTML={{__html: t('removeWorkspaceDesc2')}} />
            </div>
            <div>
                <button
                    className={`btn btn-sm gap-2 !border-none bg-red-400 hover:bg-red-500 text-white no-animation btn-animation ${
                        isLoading ? 'pointer-events-none opacity-40' : ''
                    }`}
                    onClick={onClick}
                >
                    <span>{t('removeAndDisconnect')}</span>
                </button>
            </div>
        </div>
    );
});
RemoveWorkspaceSection.displayName = 'RemoveWorkspaceSection';
