import React, {memo} from 'react';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {UseFormReturn} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
    billingHistoryIdState,
    memoState,
} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodies/atom';
import {AddBillingHistory, AddBillingHistoryState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';

interface MemoBodyProps {
    form: UseFormReturn<CreateBillingHistoryRequestDto>;
}
export const MemoBody = memo((props: MemoBodyProps) => {
    const [memo, setMemo] = useRecoilState(memoState);
    const setAddBillingHistory = useSetRecoilState(AddBillingHistoryState);
    const billingHistoryId = useRecoilValue(billingHistoryIdState);
    const appId = useRecoilValue(appIdState);

    const {form} = props;
    const onClick = () => {
        if (!appId || !billingHistoryId) return;

        form.setValue('memo', memo);

        const req = appBillingHistoryApi.updateV2(appId, billingHistoryId, form.getValues());

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
