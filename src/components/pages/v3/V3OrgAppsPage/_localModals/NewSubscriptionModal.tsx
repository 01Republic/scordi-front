import {memo} from 'react';
import {NewSubscriptionModalGroup} from '^v3/share/modals/NewSubscriptionModalManually/NewSubscriptionModalGroup';
import {useSubscriptionMenuSummaryV2} from '^models/SubscsriptionSummary/hook';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';

export const NewSubscriptionModalInAppShow = memo(() => {
    const {index: reloadSummary} = useSubscriptionMenuSummaryV2(); // 구독리스트 > 요약패널 갱신용
    const {reload: reloadTableData} = useSubscriptionTableListAtom(); // 구독리스트 > 테이블 갱신용

    const onCreate = () => {
        reloadSummary();
        reloadTableData();
    };
    return <NewSubscriptionModalGroup onCreate={onCreate} />;
});
