import React, {memo, useState} from 'react';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {confirm2, confirmed} from '^components/util/dialog';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {RotateCw} from 'lucide-react';
import {delay} from '^components/util/delay';

interface SlackWorkspaceMembersSyncButtonProps {
    workspace?: IntegrationSlackWorkspaceDto;
    reload?: () => any;
}

export const SlackWorkspaceMembersSyncButton = memo((props: SlackWorkspaceMembersSyncButtonProps) => {
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
SlackWorkspaceMembersSyncButton.displayName = 'SlackWorkspaceMembersSyncButton';
