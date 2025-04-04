import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {integrationSlackWorkspaceApi} from '^models/integration/IntegrationSlackWorkspace/api';
import {OrgSettingsIntegrationsPageRoute} from '^pages/orgs/[id]/settings/integrations';

interface RemoveWorkspaceSectionProps {
    workspace?: IntegrationSlackWorkspaceDto;
    reload?: () => any;
}

export const RemoveWorkspaceSection = memo((props: RemoveWorkspaceSectionProps) => {
    const {workspace, reload} = props;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const request = async (orgId: number, id: number) => {
        return integrationSlackWorkspaceApi.destroy(orgId, id);
    };

    const onClick = async () => {
        if (!workspace) return;

        const {id, organizationId} = workspace;
        const continueConfirm = () => {
            return confirm2(
                '워크스페이스 연결을 해제할까요?',
                <div>
                    <p>계속 진행할까요?</p>
                </div>,
            );
        };

        return confirmed(continueConfirm())
            .then(() => setIsLoading(true))
            .then(() => request(organizationId, id))
            .then(() => toast.success('삭제 완료'))
            .then(() => router.push(OrgSettingsIntegrationsPageRoute.path(organizationId)))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="mb-6 flex flex-col gap-4">
            <h3 className="text-16">Slack 워크스페이스 연결 해제</h3>

            <div className="flex flex-col gap-1.5">
                <div className="text-14 text-gray-500">
                    Slack 워크스페이스(<span className="font-medium text-black">{workspace?.workspaceName}</span>) 와의
                    연결을 해제하고 스코디에 저장된 모든 관련 데이터를 삭제합니다.
                </div>
                <div className="text-14 text-gray-500">
                    이 작업은 <u>연결된 슬랙 계정들</u> 뿐 아니라, <u>워크스페이스 정보</u> 역시 함께 삭제합니다.
                </div>
            </div>

            <div>
                <button
                    className={`btn gap-2 !border-none bg-red-400 hover:bg-red-500 text-white no-animation btn-animation ${
                        isLoading ? 'pointer-events-none opacity-40' : ''
                    }`}
                    onClick={onClick}
                >
                    <span>워크스페이스 제거하고 연결 해제</span>
                </button>
            </div>
        </div>
    );
});
RemoveWorkspaceSection.displayName = 'RemoveWorkspaceSection';
