import {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals';
import {
    newFormForBillingInfoModalAtom,
    newFormForFinishModalAtom,
    newFormForGeneralInfoModalAtom,
    newFormForMemoModalAtom,
    newFormForUsingMemberInfoModalAtom,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {FormForGeneralInfoModal} from '^v3/share/modals/NewSubscriptionModalManually/FormForGeneralInfoModal';
import {FormForBillingInfoModal} from '^v3/share/modals/NewSubscriptionModalManually/FormForBillingInfoModal';
import {FormForUsingMemberInfoModal} from '^v3/share/modals/NewSubscriptionModalManually/FormForUsingMemberInfoModal';
import {FormForFinishModal} from '^v3/share/modals/NewSubscriptionModalManually/FormForFinishModal';
import {FormForMemoModal} from '^v3/share/modals/NewSubscriptionModalManually/FormForMemoModal';

interface NewSubscriptionModalGroupProps {
    onCreate: () => any;
}
export const NewSubscriptionModalGroup = memo((props: NewSubscriptionModalGroupProps) => {
    const billingInfoModal = useModal(newFormForBillingInfoModalAtom);
    const usingMemberModal = useModal(newFormForUsingMemberInfoModalAtom);
    const generalInfoModal = useModal(newFormForGeneralInfoModalAtom);
    const finishModal = useModal(newFormForFinishModalAtom);
    const memoModal = useModal(newFormForMemoModalAtom);

    const {onCreate} = props;

    useEffect(() => {
        billingInfoModal.isShow && billingInfoModal.setIsShow(false);
        usingMemberModal.isShow && billingInfoModal.setIsShow(false);
        generalInfoModal.isShow && billingInfoModal.setIsShow(false);
        finishModal.isShow && billingInfoModal.setIsShow(false);
        memoModal.isShow && billingInfoModal.setIsShow(false);
    }, []);

    return (
        <>
            <FormForGeneralInfoModal />
            <FormForBillingInfoModal />
            <FormForUsingMemberInfoModal onCreate={onCreate} />
            <FormForFinishModal />
            <FormForMemoModal />
        </>
    );
});
