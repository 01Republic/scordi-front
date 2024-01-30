import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {DeleteButton} from '^v3/share/modals/AppShowPageModal/DeleteButton';
import {useBillingHistoryInModal, useBillingHistoryModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';

interface DeleteButtonProps {
    onFinish?: () => any;
}
export const BillingHistoryDeleteButton = memo(function BillingHistoryDeleteButton(props: DeleteButtonProps) {
    const [isEditMode, setIsEditMode] = useRecoilState(isBillingHistoryEditModeAtom);
    const {setIsShow} = useBillingHistoryModal();
    const {reload: loadHistories} = useBillingHistoryListOfSubscription();
    const {deleteBillingHistory} = useBillingHistoryInModal();

    const {onFinish} = props;

    const onClick = () =>
        deleteBillingHistory().then(() => {
            loadHistories();
            setIsEditMode(false);
            setIsShow(false);
            onFinish && onFinish();
        });

    if (!isEditMode) return <></>;

    return <DeleteButton isShow={true} onClick={onClick} />;
});
