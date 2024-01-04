import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {DeleteButton} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/DeleteButton';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';

export const BillingHistoryDeleteButton = memo(function BillingHistoryDeleteButton() {
    const [isEditMode, setIsEditMode] = useRecoilState(isBillingHistoryEditModeAtom);
    const {deleteBillingHistory} = useBillingHistoryInModal();
    const onClick = () => deleteBillingHistory().then(() => setIsEditMode(false));

    if (!isEditMode) return <></>;

    return <DeleteButton isShow={!isEditMode} onClick={onClick} />;
});
