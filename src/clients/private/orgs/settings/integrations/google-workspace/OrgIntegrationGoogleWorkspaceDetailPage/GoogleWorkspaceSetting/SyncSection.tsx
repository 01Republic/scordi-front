import React, {memo} from 'react';
import {RotateCw} from 'lucide-react';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {useSlackWorkspaceMembersSync} from '^models/integration/IntegrationSlackMember/hooks';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {useGoogleWorkspaceMembersSync} from '^models/integration/IntegrationGoogleWorkspaceMember/hooks';
import {useTranslation} from 'next-i18next';

interface SyncSectionProps {
    workspace?: IntegrationGoogleWorkspaceWorkspaceDto;
    reload?: () => any;
}

export const SyncSection = memo((props: SyncSectionProps) => {
    const {workspace, reload} = props;
    const {isLoading, onClick} = useGoogleWorkspaceMembersSync(workspace?.organizationId, workspace?.id, {
        onSuccess: () => reload && reload(),
    });
    const {t} = useTranslation('integrations');

    return (
        <div className="mb-6 flex flex-col gap-4">
            <h3 className="text-16">{t('syncMemberList')}</h3>
            <div className="flex flex-col gap-1.5">
                <div className="text-14 text-gray-500">
                    {t('syncMemberListDesc', {workspaceName: workspace?.workspaceName})}
                </div>
                <div className="text-14 text-gray-500">
                    <span className="mr-4">{t('lastSync')}</span>
                    <span className="font-medium text-black">{workspace?.updatedAt?.toLocaleString()}</span>
                </div>
            </div>
            <div>
                <button
                    className={`btn btn-sm gap-2 btn-white no-animation btn-animation ${
                        isLoading ? 'pointer-events-none opacity-40' : ''
                    }`}
                    onClick={onClick}
                >
                    <div className={`inline-block ${isLoading ? 'animate-spin' : ''}`}>
                        <RotateCw />
                    </div>
                    <span>{t('sync')}</span>
                </button>
            </div>
        </div>
    );
});
SyncSection.displayName = 'SyncSection';
