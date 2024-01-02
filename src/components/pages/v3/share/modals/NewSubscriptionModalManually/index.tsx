import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {NewSubscriptionModalGroup} from '^v3/share/modals/NewSubscriptionModalManually/NewSubscriptionModalGroup';

export const NewSubscriptionModalManually = memo(function NewSubscriptionModalManually() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    useEffect(() => {
        setFormData(new CreateSubscriptionRequestDto());
    }, []);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return <NewSubscriptionModalGroup />;
});
