import React, {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {codefBankAccountAdminApi} from '^models/CodefBankAccount/api';

export const AllCodefBankAccountSyncButton = memo(() => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = (slackMute = false) => {
        if (isLoading) return;

        const check = () => {
            return confirm2(
                '전체 조직의 계좌배치를 지금 실행할까요?',
                <div className="text-14">
                    이 작업은 도중에 중단 할 수 없습니다.
                    <br />
                    <b>완료 될 때 까지 절대로 페이지를 벗어나지 마세요.</b>
                    <br />
                    지금 시작할까요? (슬랙실행: {slackMute ? 'Off' : 'On'})
                </div>,
            );
        };

        return confirmed(check())
            .then(() => setIsLoading(true))
            .then(() => codefBankAccountAdminApi.sync({slackMute}))
            .then(() => toast('배치 실행 완료'))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <button
            className={`btn btn-white no-animation btn-animation ${
                isLoading ? 'loading pointer-events-none opacity-30' : ''
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
AllCodefBankAccountSyncButton.displayName = 'AllCodefBankAccountSyncButton';
