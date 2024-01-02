import {useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
    newFormForFinishModalAtom,
    newFormForGeneralInfoModalAtom,
    newFormForMemoModalAtom,
    newFormForUsingMemberInfoModalAtom,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';

export const useNewSubscriptionModal = () => {
    const billingInfoModal = useModal(newFormForBillingInfoModalAtom);
    const usingMemberModal = useModal(newFormForUsingMemberInfoModalAtom);
    const generalInfoModal = useModal(newFormForGeneralInfoModalAtom);
    const finishModal = useModal(newFormForFinishModalAtom);
    const memoModal = useModal(newFormForMemoModalAtom);

    const closeModalGroup = () => {
        billingInfoModal.close();
        usingMemberModal.close();
        generalInfoModal.close();
        finishModal.close();
        memoModal.close();
    };

    return {closeModalGroup};
};
