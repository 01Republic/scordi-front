import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {groupDuplicateCards} from '^models/CodefCard/type/util';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {useIdParam} from '^atoms/common';
import {codefCardAdminApi} from '^models/CodefCard/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {errorToast} from '^api/api';

interface Props {
    isLoading: boolean;
    reload: () => any;
}

export const OrgAllCodefCardSyncButton = memo((props: Props) => {
    const {isLoading, reload} = props;
    const orgId = useIdParam('id');
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();

    const onClick = () => {
        if (isSyncRunning) return;
        if (!orgId || isNaN(orgId) || orgId === 0) return;

        setIsSyncRunning(true);
        const check = () => {
            return confirm2(
                '이 조직의 카드배치를 지금 실행할까요?',
                <div className="text-14">
                    이 작업은 도중에 중단 할 수 없습니다.
                    <br />
                    지금 시작할까요?
                </div>,
            );
        };

        return confirmed(check())
            .then(() => setIsSyncRunning(true))
            .then(() => codefCardAdminApi.sync({orgId}))
            .then(() => toast('배치 실행 완료'))
            .catch(errorToast)
            .finally(() => {
                setIsSyncRunning(false);
                return reload();
            });
    };

    return (
        <button
            className={`btn btn-xs btn-white no-animation btn-animation ${
                isSyncRunning ? 'loading pointer-events-none opacity-30' : ''
            }`}
            onClick={onClick}
        >
            배치 수동 실행
        </button>
    );
});
OrgAllCodefCardSyncButton.displayName = 'OrgAllCodefCardSyncButton';
