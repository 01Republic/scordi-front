import React, {memo} from 'react';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import {AddBillingHistory, AddBillingHistoryState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {
    billingHistoryIdState,
    memoState,
} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/atoms';

export const MemoBody = memo(() => {
    const [memo, setMemo] = useRecoilState(memoState);
    const setAddBillingHistory = useSetRecoilState(AddBillingHistoryState);
    const billingHistoryId = useRecoilValue(billingHistoryIdState);
    const onClick = () => {
        if (!billingHistoryId) return;

        const req = appBillingHistoryApi.updateV2(billingHistoryId, {memo});

        req.then(() => setAddBillingHistory(AddBillingHistory.Finish));
        req.catch((e) => console.log(e));
    };

    return (
        <>
            <textarea
                onChange={(e) => setMemo(e.target.value)}
                className="textarea textarea-primary w-full min-h-40"
                placeholder="디자인팀 피그마 결제"
                defaultValue={memo}
            />

            <AddBillingHistoryModalBtn onClick={onClick} text="완료" />
        </>
    );
});
