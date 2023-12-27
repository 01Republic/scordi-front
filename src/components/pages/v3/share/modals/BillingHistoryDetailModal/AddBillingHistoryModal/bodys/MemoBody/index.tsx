import React, {memo} from 'react';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {UseFormReturn} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {memoState} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodys/atom';
import {AddBillingHistory, AddBillingHistoryState} from '^v3/share/modals/BillingHistoryDetailModal/atom';

interface MemoBodyProps {
    form: UseFormReturn<CreateBillingHistoryRequestDto>;
}
export const MemoBody = memo((props: MemoBodyProps) => {
    const [memo, setMemo] = useRecoilState(memoState);
    const setAddBillingHistory = useSetRecoilState(AddBillingHistoryState);

    const {form} = props;
    const onClick = () => {
        form.setValue('memo', memo);
        setAddBillingHistory(AddBillingHistory.Finish);
    };

    return (
        <>
            <textarea
                onChange={(e) => setMemo(e.target.value)}
                className="textarea textarea-primary w-full min-h-40"
                placeholder="디자인팀 피그마 결제..."
            />

            <AddBillingHistoryModalBtn onClick={onClick} text="완료" />
        </>
    );
});
