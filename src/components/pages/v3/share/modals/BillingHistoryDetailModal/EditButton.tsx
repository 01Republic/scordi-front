import {TopRightButton} from '^v3/share/modals';
import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';

export const BillingHistoryEditButton = memo(function EditButton() {
    const [isEditMode, setIsEditMode] = useRecoilState(isBillingHistoryEditModeAtom);

    if (isEditMode) return <></>;

    return <TopRightButton text="수정" onClick={() => setIsEditMode(true)} />;
});
