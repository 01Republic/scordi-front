import {atom, useRecoilState} from 'recoil';
import {SubscriptionDto} from '^types/subscription.type';
import {getSubscription} from '^api/subscription.api';
import {Locale} from '^types/subscriptionBillingCycle.type';
import {useRouter} from 'next/router';

const currentSubscriptionState = atom<SubscriptionDto | null>({
    key: 'currentSubscription',
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
        const request = getSubscription(id);
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
