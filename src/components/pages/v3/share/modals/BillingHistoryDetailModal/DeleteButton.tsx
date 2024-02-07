import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {DeleteButton} from '^v3/share/modals/AppShowPageModal/DeleteButton';
import {useBillingHistoryInModal, useBillingHistoryModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';

interface DeleteButtonProps {
    onDelete?: () => any;
}
export const BillingHistoryDeleteButton = memo(function BillingHistoryDeleteButton(props: DeleteButtonProps) {
    const [isEditMode, setIsEditMode] = useRecoilState(isBillingHistoryEditModeAtom);
    const {setIsShow} = useBillingHistoryModal();
    const {deleteBillingHistory} = useBillingHistoryInModal();

    const {onDelete} = props;

    const onClick = () =>
        deleteBillingHistory().then(() => {
            setIsEditMode(false);
            setIsShow(false);
            onDelete && onDelete();
        });

    if (!isEditMode) return <></>;

    return <DeleteButton isShow={true} onClick={onClick} />;
});
