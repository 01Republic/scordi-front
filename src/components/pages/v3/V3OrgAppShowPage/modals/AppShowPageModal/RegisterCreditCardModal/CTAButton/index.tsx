import {memo} from 'react';
import {ModalButton} from '^v3/share/ModalButton';
import {subscriptionApi} from '^models/Subscription/api';
import {updateCurrentSubscriptionState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useToast} from '^hooks/useToast';
import {useModal} from '^v3/share/modals';
import {connectCreditCardModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal/RegisterCreditCardModal/atom';

export const CTAButton = memo(() => {
    const {currentSubscription, loadCurrentSubscription} = useCurrentSubscription();
    const formData = useRecoilValue(updateCurrentSubscriptionState);
    const orgId = useRecoilValue(orgIdParamState);
    const {close} = useModal(connectCreditCardModal);
    const {toast} = useToast();

    const onClick = () => {
        if (!orgId || !currentSubscription) return;

        const subscriptionId = currentSubscription.id;

        const req = subscriptionApi.update(subscriptionId, formData);

        req.then(() => {
            toast.success('등록되었습니다.');
            close();
            loadCurrentSubscription(orgId, subscriptionId);
        });
    };
    return <ModalButton onClick={onClick} />;
});
