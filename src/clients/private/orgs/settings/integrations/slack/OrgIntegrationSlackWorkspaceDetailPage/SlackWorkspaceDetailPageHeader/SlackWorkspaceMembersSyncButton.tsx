import React, {memo} from 'react';
import {RotateCw} from 'lucide-react';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {useSlackWorkspaceMembersSync} from '^models/integration/IntegrationSlackMember/hooks';
import {useTranslation} from 'next-i18next';

interface SlackWorkspaceMembersSyncButtonProps {
    workspace?: IntegrationSlackWorkspaceDto;
    reload?: () => any;
}

export const SlackWorkspaceMembersSyncButton = memo((props: SlackWorkspaceMembersSyncButtonProps) => {
    const {workspace, reload} = props;
    const {isLoading, onClick} = useSlackWorkspaceMembersSync(workspace?.organizationId, workspace?.id, {
        onSuccess: () => reload && reload(),
    });
    const {t} = useTranslation('integrations');

    return (
        <button
            className={`btn gap-2 btn-white no-animation btn-animation ${
                isLoading ? 'pointer-events-none opacity-40' : ''
            }`}
            onClick={onClick}
        >
            <div className={`inline-block ${isLoading ? 'animate-spin' : ''}`}>
                <RotateCw />
            </div>
            <span>{isLoading ? t('loading') : t('sync')}</span>
        </button>
    );
});
SlackWorkspaceMembersSyncButton.displayName = 'SlackWorkspaceMembersSyncButton';
