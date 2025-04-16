import React from 'react';
import {useRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {integrationSlackMemberApi} from '../api';
import {slackWorkspaceMembersSyncIsLoadingAtom} from '../atom';

interface SlackMemberSyncOption {
    onSuccess?: () => any;
}

export const useSlackWorkspaceMembersSync = (
    organizationId: number | undefined,
    id: number | undefined,
    option: SlackMemberSyncOption = {},
) => {
    const {onSuccess} = option;
    const [isLoading, setIsLoading] = useRecoilState(slackWorkspaceMembersSyncIsLoadingAtom);

    const request = async (orgId: number, id: number) => {
        return integrationSlackMemberApi.create(orgId, id);
    };

    const onClick = async () => {
        if (!organizationId) return;
        if (!id) return;

        const continueConfirm = () => {
            return confirm2(
                'Slack 에서 멤버를 불러옵니다.',
                <div>
                    <p>불러오지 못한 멤버 계정이 있다면 실행해보세요.</p>
                    <p>Slack으로 멤버들에게 알림을 보낼 수 있어요.</p>
                    <p>계속 진행할까요?</p>
                </div>,
            );
        };

        return confirmed(continueConfirm())
            .then(() => setIsLoading(true))
            .then(() => request(organizationId, id))
            .then(() => toast.success('최신화 완료'))
            .then(() => onSuccess && onSuccess())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return {
        isLoading,
        onClick,
    };
};
