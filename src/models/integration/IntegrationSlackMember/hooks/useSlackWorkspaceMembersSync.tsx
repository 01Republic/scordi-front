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
