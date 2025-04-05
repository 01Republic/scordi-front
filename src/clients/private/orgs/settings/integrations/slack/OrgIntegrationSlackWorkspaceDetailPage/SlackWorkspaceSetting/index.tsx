import React, {memo} from 'react';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';
import {useSlackMembersInDetailPage} from '^models/integration/IntegrationSlackMember/hook';
import {SyncSection} from './SyncSection';
import {RemoveWorkspaceSection} from './RemoveWorkspaceSection';

interface SlackWorkspaceSettingProps {
    //
}

export const SlackWorkspaceSetting = memo((props: SlackWorkspaceSettingProps) => {
    const {data: workspace, refetch: reloadWorkspace} = useSlackWorkspaceInDetailPage();
    const {refetch: reloadSlackMembers} = useSlackMembersInDetailPage({
        relations: ['teamMember'],
        order: {isDeleted: 'ASC', id: 'DESC'},
        itemsPerPage: 0,
    });

    const reload = async () => {
        reloadSlackMembers();
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
SlackWorkspaceSetting.displayName = 'SlackWorkspaceSetting';
