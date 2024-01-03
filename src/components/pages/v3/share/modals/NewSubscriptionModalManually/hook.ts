import {useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
    newFormForFinishModalAtom,
    newFormForGeneralInfoModalAtom,
    newFormForUsingMemberInfoModalAtom,
    newSubscriptionManualFormData,
    subscriptionManualFormDataDefaultValue,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {useSetRecoilState} from 'recoil';

export const useAddSubscriptionModals = () => {
    const billingInfoModal = useModal(newFormForBillingInfoModalAtom);
    const generalInfoModal = useModal(newFormForGeneralInfoModalAtom);
    const memberInfoModal = useModal(newFormForUsingMemberInfoModalAtom);
    const finishModal = useModal(newFormForFinishModalAtom);
    const setFormData = useSetRecoilState(newSubscriptionManualFormData);

    const resetForm = () => setFormData(subscriptionManualFormDataDefaultValue);

    const closeModals = () => {
        billingInfoModal.close();
        generalInfoModal.close();
        memberInfoModal.close();
        finishModal.close();
    };

    return {closeModals, resetForm};
};
