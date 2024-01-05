import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals';
import {newFormForUsingMemberInfoModalAtom, newSubscriptionManualFormData} from '../atom';
import {NextButtonUI} from '../../../NextButtonUI';
import {debounce} from 'lodash';

export const NextButton = memo(function NextButton() {
    const [formData] = useRecoilState(newSubscriptionManualFormData);
    const {open: openUsingMemberInfoModal} = useModal(newFormForUsingMemberInfoModalAtom);

    const onNext = debounce(() => {
        openUsingMemberInfoModal();
    }, 500);

    const isActive = !!formData.currentBillingAmount?.amount;
    // const isActive =
    //     !!formData.billingCycleType &&
    //     !!formData.recurringType &&
    //     !!formData.currentBillingAmount?.amount &&
    //     !!formData.currentBillingAmount.currency;

    return (
        <NextButtonUI isActive={isActive} onClick={onNext}>
            다음
        </NextButtonUI>
    );
});
