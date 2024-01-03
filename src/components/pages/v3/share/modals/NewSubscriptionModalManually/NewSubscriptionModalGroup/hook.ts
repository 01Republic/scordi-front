import {useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
    newFormForFinishModalAtom,
    newFormForGeneralInfoModalAtom,
    newFormForMemoModalAtom,
    newFormForUsingMemberInfoModalAtom,
    newSubscriptionManualFormData,
    subscriptionManualFormDataDefaultValue,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {useSetRecoilState} from 'recoil';

export const useNewSubscriptionModal = () => {
    const billingInfoModal = useModal(newFormForBillingInfoModalAtom);
    const usingMemberModal = useModal(newFormForUsingMemberInfoModalAtom);
    const generalInfoModal = useModal(newFormForGeneralInfoModalAtom);
    const finishModal = useModal(newFormForFinishModalAtom);
    const memoModal = useModal(newFormForMemoModalAtom);
    const setFormData = useSetRecoilState(newSubscriptionManualFormData);

    const closeModalGroup = () => {
        if (generalInfoModal.isShow) generalInfoModal.setIsShow(false);
        if (billingInfoModal.isShow) billingInfoModal.setIsShow(false);
        if (usingMemberModal.isShow) usingMemberModal.setIsShow(false);
        if (finishModal.isShow) finishModal.setIsShow(false);
        if (memoModal.isShow) memoModal.setIsShow(false);
        setFormData(subscriptionManualFormDataDefaultValue);
    };

    return {closeModalGroup};
};
