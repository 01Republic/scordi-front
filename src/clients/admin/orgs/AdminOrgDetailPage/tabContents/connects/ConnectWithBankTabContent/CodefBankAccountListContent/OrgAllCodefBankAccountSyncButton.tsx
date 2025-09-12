import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {useIdParam} from '^atoms/common';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {codefBankAccountAdminApi} from '^models/CodefBankAccount/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';
import {useRecoilState} from 'recoil';
import {isSyncRunningAtom} from '^models/CodefCard/hooks/useCodefCardSyncQueue';

interface Props {
    isLoading: boolean;
    reload: () => any;
}

export const OrgAllCodefBankAccountSyncButton = memo((props: Props) => {
    const {reload} = props;
    const orgId = useIdParam('id');
    const [isSyncRunning, setIsSyncRunning] = useRecoilState(isSyncRunningAtom);

    const onClick = (slackMute = false) => {
        if (isSyncRunning) return;
        if (!orgId || isNaN(orgId) || orgId === 0) return;

        const check = () => {
            return confirm2(
                '이 조직의 계좌배치를 지금 실행할까요?',
                <div className="text-14">
                    이 작업은 도중에 중단 할 수 없습니다.
                    <br />
                    지금 시작할까요? (슬랙실행: {slackMute ? 'Off' : 'On'})
                </div>,
            );
        };

        return confirmed(check())
            .then(() => setIsSyncRunning(true))
            .then(() => codefBankAccountAdminApi.sync({orgId, slackMute, notificationMute: true}))
            .then(() => toast('배치 실행 완료'))
            .then(() => reload())
            .catch(errorToast)
            .finally(() => setIsSyncRunning(false));
    };

    return (
        <button
            className={`btn btn-xs btn-white no-animation btn-animation ${
                isSyncRunning ? 'loading pointer-events-none opacity-30' : ''
            }`}
            onClick={() => onClick()}
            onContextMenu={(e) => {
                e.stopPropagation();
                e.preventDefault();
                return onClick(true);
            }}
        >
            계좌 배치 수동 실행
        </button>
    );
});
OrgAllCodefBankAccountSyncButton.displayName = 'OrgAllCodefBankAccountSyncButton';
