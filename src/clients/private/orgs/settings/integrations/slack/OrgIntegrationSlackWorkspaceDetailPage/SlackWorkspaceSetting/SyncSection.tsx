import React, {memo, useState} from 'react';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {RotateCw} from 'lucide-react';

interface SyncSectionProps {
    workspace?: IntegrationSlackWorkspaceDto;
    reload?: () => any;
}

export const SyncSection = memo((props: SyncSectionProps) => {
    const {workspace, reload} = props;
    const [isLoading, setIsLoading] = useState(false);

    const request = async (orgId: number, id: number) => {
        return integrationSlackMemberApi.create(orgId, id);
    };

    const onClick = async () => {
        if (!workspace) return;

        const {id, organizationId} = workspace;
        const continueConfirm = () => {
            return confirm2(
                'Slack 에서 멤버를 불러옵니다.',
                <div>
                    <p>계속 진행할까요?</p>
                </div>,
            );
        };

        return confirmed(continueConfirm())
            .then(() => setIsLoading(true))
            .then(() => request(organizationId, id))
            .then(() => toast.success('최신화 완료'))
            .then(() => reload && reload())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="mb-6 flex flex-col gap-4">
            <h3 className="text-16">구성원 계정 목록 동기화</h3>

            <div className="flex flex-col gap-1.5">
                <div className="text-14 text-gray-500">
                    Slack 워크스페이스(<span className="font-medium text-black">{workspace?.workspaceName}</span>) 에서
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
