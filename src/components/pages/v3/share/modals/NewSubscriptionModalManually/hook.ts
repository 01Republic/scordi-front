import {useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
    newFormForFinishModalAtom,
    newFormForGeneralInfoModalAtom,
    newFormForUsingMemberInfoModalAtom,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';

export const useAddSubscriptionModals = () => {
    const billingInfoModal = useModal(newFormForBillingInfoModalAtom);
    const generalInfoModal = useModal(newFormForGeneralInfoModalAtom);
    const memberInfoModal = useModal(newFormForUsingMemberInfoModalAtom);
    const finishModal = useModal(newFormForFinishModalAtom);

    const closeModals = () => {
        billingInfoModal.close();
        generalInfoModal.close();
        memberInfoModal.close();
        finishModal.close();
    };

    return {closeModals};
};
