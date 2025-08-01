import React, {memo} from 'react';
import {RotateCw} from 'lucide-react';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {useSlackWorkspaceMembersSync} from '^models/integration/IntegrationSlackMember/hooks';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {useGoogleWorkspaceMembersSync} from '^models/integration/IntegrationGoogleWorkspaceMember/hooks';

interface SyncSectionProps {
    workspace?: IntegrationGoogleWorkspaceWorkspaceDto;
    reload?: () => any;
}

export const SyncSection = memo((props: SyncSectionProps) => {
    const {workspace, reload} = props;
    const {isLoading, onClick} = useGoogleWorkspaceMembersSync(workspace?.organizationId, workspace?.id, {
        onSuccess: () => reload && reload(),
    });

    return (
        <div className="mb-6 flex flex-col gap-4">
            <h3 className="text-16">구성원 계정 목록 동기화</h3>

            <div className="flex flex-col gap-1.5">
                <div className="text-14 text-gray-500">
                    Google Workspace(<span className="font-medium text-black">@{workspace?.workspaceName}</span>) 에서
                    최신 구성원 계정 목록을 불러옵니다.
                </div>
                <div className="text-14 text-gray-500">
                    <span className="mr-4">최근 동기화</span>
                    <span className="font-medium text-black">{workspace?.updatedAt.toLocaleString()}</span>
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
                    <span>동기화</span>
                </button>
            </div>
        </div>
    );
});
SyncSection.displayName = 'SyncSection';
