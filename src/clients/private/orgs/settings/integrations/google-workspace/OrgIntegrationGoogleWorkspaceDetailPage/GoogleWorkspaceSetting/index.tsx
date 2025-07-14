import React, {memo} from 'react';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';
import {useSlackMembersInDetailPage} from '^models/integration/IntegrationSlackMember/hooks';
import {SyncSection} from './SyncSection';
import {RemoveWorkspaceSection} from './RemoveWorkspaceSection';
import {useGoogleWorkspaceInDetailPage} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/hook';
import {useGoogleWorkspaceMembersInDetailPage} from '^models/integration/IntegrationGoogleWorkspaceMember/hooks';

interface GoogleWorkspaceSettingProps {
    //
}

export const GoogleWorkspaceSetting = memo((props: GoogleWorkspaceSettingProps) => {
    const {data: workspace, refetch: reloadWorkspace} = useGoogleWorkspaceInDetailPage();
    const {refetch: reloadMembers} = useGoogleWorkspaceMembersInDetailPage();

    const reload = async () => {
        reloadMembers();
        reloadWorkspace();
    };

    return (
        <div className="mt-8">
            <div className="card card-bordered card-body rounded-lg overflow-hidden w-full bg-white">
                <SyncSection workspace={workspace} reload={reload} />
                <br />
                <RemoveWorkspaceSection workspace={workspace} reload={reload} />
            </div>
        </div>
    );
});
GoogleWorkspaceSetting.displayName = 'GoogleWorkspaceSetting';
