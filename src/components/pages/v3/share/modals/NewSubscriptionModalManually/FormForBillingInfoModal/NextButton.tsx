import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals';
import {newFormForUsingMemberInfoModalAtom, newSubscriptionManualFormData} from '../atom';
import {NextButtonUI} from '../NextButtonUI';

export const NextButton = memo(function NextButton() {
    const [formData] = useRecoilState(newSubscriptionManualFormData);
    const {open: openUsingMemberInfoModal} = useModal(newFormForUsingMemberInfoModalAtom);

    const onNext = () => {
        openUsingMemberInfoModal();
    };

    return (
        <NextButtonUI
            isActive={
                !!formData.billingCycleType &&
                typeof formData.isPerUser !== 'undefined' &&
                !!formData.currentBillingAmount?.amount &&
                !!formData.currentBillingAmount.currency
            }
            onClick={onNext}
        >
            다음
        </NextButtonUI>
    );
});
