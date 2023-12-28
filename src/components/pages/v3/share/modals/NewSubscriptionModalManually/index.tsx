import React, {memo, useEffect} from 'react';
import {FormForGeneralInfoModal} from './FormForGeneralInfoModal';
import {FormForBillingInfoModal} from '^v3/share/modals/NewSubscriptionModalManually/FormForBillingInfoModal';
import {FormForUsingMemberInfoModal} from '^v3/share/modals/NewSubscriptionModalManually/FormForUsingMemberInfoModal';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';

export const NewSubscriptionModalManually = memo(function NewSubscriptionModalManually() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    useEffect(() => {
        setFormData(new CreateSubscriptionRequestDto());
    }, []);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <>
            <FormForGeneralInfoModal />
            <FormForBillingInfoModal />
            <FormForUsingMemberInfoModal />
        </>
    );
});
