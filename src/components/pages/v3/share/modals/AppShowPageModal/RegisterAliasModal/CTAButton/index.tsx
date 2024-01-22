import {memo} from 'react';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';
import {updateCurrentSubscriptionState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals';
import {registerAliasModal} from '^v3/share/modals/AppShowPageModal/RegisterAliasModal/atom';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';

interface CTAButtonProps {
    afterChange?: () => void;
}

export const CTAButton = memo((props: CTAButtonProps) => {
    const {currentSubscription, loadCurrentSubscription} = useCurrentSubscription();
    const {close} = useModal(registerAliasModal);

    const orgId = useRecoilValue(orgIdParamState);
    const formData = useRecoilValue(updateCurrentSubscriptionState);
    const {toast} = useToast();

    const {afterChange} = props;

    const onClick = debounce(() => {
        if (!orgId || !currentSubscription) return;

        const subscriptionId = currentSubscription.id;
        const req = subscriptionApi.update(subscriptionId, formData);

        req.then(() => {
            toast.success('등록되었습니다.');
            close();
            loadCurrentSubscription(orgId, subscriptionId);
            afterChange && afterChange();
        });
    }, 500);

    return (
        <NextButtonUI isActive={true} onClick={() => onClick()}>
            등록하기
        </NextButtonUI>
    );
});
