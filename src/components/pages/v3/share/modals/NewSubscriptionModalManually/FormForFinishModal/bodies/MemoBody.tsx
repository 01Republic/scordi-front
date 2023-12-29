import React, {memo} from 'react';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {FinishStatus, FinishStatusAtom, memoAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';

export const MemoBody = memo(() => {
    const [memo, setMemo] = useRecoilState(memoAtom);
    const setFinishStatus = useSetRecoilState(FinishStatusAtom);

    const onClick = () => {
        // 메모 업데이트 api
        setFinishStatus(FinishStatus.Finish);
    };
    return (
        <>
            <textarea
                onChange={(e) => setMemo(e.target.value)}
                className="textarea textarea-primary w-full min-h-40"
                placeholder=""
                defaultValue={memo}
            />

            <div
                data-component="ModalLikeBottomBar"
                className={`fixed bottom-0 left-0 w-full flex justify-evenly gap-3 px-5 py-5 `}
            >
                <button
                    className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                    onClick={onClick}
                >
                    완료
                </button>
            </div>
        </>
    );
});
