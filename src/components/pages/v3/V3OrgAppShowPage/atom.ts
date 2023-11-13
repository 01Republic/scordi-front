import {atom, useRecoilState} from 'recoil';
import {SubscriptionDto} from '^types/subscription.type';
import {Locale} from '^types/subscriptionBillingCycle.type';
import {useRouter} from 'next/router';
import {subscriptionApi} from '^api/subscription.api';

const currentSubscriptionState = atom<SubscriptionDto | null>({
    key: 'currentSubscription',
    default: null,
});

const currentSubscriptionLoadingState = atom<boolean>({
    key: 'currentSubscriptionLoadingState',
    default: false,
});

export const useCurrentSubscription = () => {
    const router = useRouter();
    const [currentSubscription, setCurrentSubscription] = useRecoilState(currentSubscriptionState);
    const [isLoading, setIsLoading] = useRecoilState(currentSubscriptionLoadingState);

    const loadCurrentSubscription = (organizationId: number, id: number) => {
        setIsLoading(true);
        const request = subscriptionApi.show(id);
        request.then((res) => setCurrentSubscription(res.data));
        request.finally(() => setIsLoading(false));
    };

    const getBillingType = (standalone = false) => {
        if (!currentSubscription) return '';

        const locale = (router.locale as Locale) || Locale.ko;
        return currentSubscription.getBillingType(standalone, locale);
    };

    return {currentSubscription, loadCurrentSubscription, isLoading, getBillingType};
};
