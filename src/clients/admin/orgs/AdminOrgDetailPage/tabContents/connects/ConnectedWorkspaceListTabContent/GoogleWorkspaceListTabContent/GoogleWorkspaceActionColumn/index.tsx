import React, {memo, useState} from 'react';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {MoreHorizontal} from 'lucide-react';
import {confirm2, confirmed} from '^components/util/dialog';
import {integrationGoogleWorkspaceWorkspaceApi} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface GoogleWorkspaceActionColumnProps {
    workspace: IntegrationGoogleWorkspaceWorkspaceDto;
    reload: () => any;
}

export const GoogleWorkspaceActionColumn = memo((props: GoogleWorkspaceActionColumnProps) => {
    const {workspace, reload} = props;
    const orgId = workspace.organizationId;
    const id = workspace.id;
    const [isLoading, setIsLoading] = useState(false);

    const syncClick = () => {
        const sync = () => confirm2('워크스페이스를 최신화 합니다.');
        confirmed(sync())
            .then(() => setIsLoading(true))
            .then(() => integrationGoogleWorkspaceWorkspaceApi.sync(orgId, id))
            .then(() => reload())
            .then(() => toast.success('최신화 완료'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    const removeClick = () => {
        const remove = () => confirm2('워크스페이스를 삭제할까요?');
        confirmed(remove())
            .then(() => setIsLoading(true))
            .then(() => integrationGoogleWorkspaceWorkspaceApi.destroy(orgId, id))
            .then(() => reload())
            .then(() => toast.success('삭제 완료'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <div className={`flex items-center justify-end gap-1 ${isLoading ? 'animate-pulse pointer-events-none' : ''}`}>
            <MoreDropdown
                placement="bottom-end"
                Trigger={() => (
                    <button
                        className={`btn btn-xs btn-square !border-gray-400 ${
                            isLoading
                                ? 'loading pointer-events-none !bg-scordi !text-white'
                                : '!bg-white !text-gray-600'
                        }`}
                    >
                        <MoreHorizontal fontSize={16} className={isLoading ? 'invisible' : ''} />
                    </button>
                )}
            >
                <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                    <MoreDropdown.MenuItem onClick={syncClick}>워크스페이스 최신화</MoreDropdown.MenuItem>
                    <MoreDropdown.MenuItem onClick={removeClick}>워크스페이스 삭제</MoreDropdown.MenuItem>
                </div>
            </MoreDropdown>
        </div>
    );
});
GoogleWorkspaceActionColumn.displayName = 'GoogleWorkspaceActionColumn';
