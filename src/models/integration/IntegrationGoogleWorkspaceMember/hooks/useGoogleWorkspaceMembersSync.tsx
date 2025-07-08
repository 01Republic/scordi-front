import React from 'react';
import {useRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {integrationGoogleWorkspaceMemberApi} from '^models/integration/IntegrationGoogleWorkspaceMember/api';
import {googleWorkspaceMembersSyncIsLoadingAtom} from '../atom';

interface MemberSyncOption {
    onSuccess?: () => any;
}

export const useGoogleWorkspaceMembersSync = (
    organizationId: number | undefined,
    id: number | undefined,
    option: MemberSyncOption = {},
) => {
    const {onSuccess} = option;
    const [isLoading, setIsLoading] = useRecoilState(googleWorkspaceMembersSyncIsLoadingAtom);

    const request = async (orgId: number, id: number) => {
        return integrationGoogleWorkspaceMemberApi.create(orgId, id);
    };

    const onClick = async () => {
        if (!organizationId) return;
        if (!id) return;

        const continueConfirm = () => {
            return confirm2(
                'Google Workspace 에서 멤버를 불러옵니다.',
                <div>
                    <p>불러오지 못한 멤버 계정이 있다면 실행해보세요.</p>
                    <p>멤버 디렉토리를 동기화 하고 최신 상태를 유지하세요.</p>
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
