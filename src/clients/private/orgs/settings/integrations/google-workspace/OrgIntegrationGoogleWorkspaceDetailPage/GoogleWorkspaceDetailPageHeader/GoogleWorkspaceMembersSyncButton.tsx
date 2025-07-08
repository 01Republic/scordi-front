import React, {memo} from 'react';
import {RotateCw} from 'lucide-react';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {useGoogleWorkspaceMembersSync} from '^models/integration/IntegrationGoogleWorkspaceMember/hooks';

interface GoogleWorkspaceMembersSyncButtonProps {
    workspace?: IntegrationGoogleWorkspaceWorkspaceDto;
    reload?: () => any;
}

export const GoogleWorkspaceMembersSyncButton = memo((props: GoogleWorkspaceMembersSyncButtonProps) => {
    const {workspace, reload} = props;
    const {isLoading, onClick} = useGoogleWorkspaceMembersSync(workspace?.organizationId, workspace?.id, {
        onSuccess: () => reload && reload(),
    });

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
            <span>{isLoading ? '불러오는중 ...' : '업데이트'}</span>
        </button>
    );
});
GoogleWorkspaceMembersSyncButton.displayName = 'GoogleWorkspaceMembersSyncButton';
