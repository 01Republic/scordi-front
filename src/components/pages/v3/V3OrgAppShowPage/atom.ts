import {atom, useRecoilState} from 'recoil';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from 'src/models/Subscription/types';
import {Locale} from '^models/Subscription/types/billingCycleType';
import {useRouter} from 'next/router';
import {subscriptionApi} from '^models/Subscription/api';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';

const currentSubscriptionState = atom<SubscriptionDto | null>({
    key: 'currentSubscription',
    default: null,
});

const currentSubscriptionLoadingState = atom<boolean>({
    key: 'currentSubscriptionLoadingState',
    default: false,
});

export const appIdState = atom<number | null>({
    key: 'appIdState',
    default: null,
});

export const updateCurrentSubscriptionState = atom<UpdateSubscriptionRequestDto>({
    key: 'updateCurrentSubscriptionState',
    default: {},
});

export const useCurrentSubscription = () => {
    const router = useRouter();
    const [currentSubscription, setCurrentSubscription] = useRecoilState(currentSubscriptionState);
    const [isLoading, setIsLoading] = useRecoilState(currentSubscriptionLoadingState);
    const {alert} = useAlert();
    const {toast} = useToast();

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

    const deleteCurrentSubscription = async () => {
        if (!currentSubscription) {
            toast.error('알 수 없는 구독');
            return;
        }

        return alert.destroy({
            title: '정말 구독을 삭제할까요?',
            showSuccessAlertOnFinal: false,
            onConfirm: async () => {
                setIsLoading(true);
                const res = subscriptionApi.destroy(currentSubscription.id);
                res.then(() => toast.success('삭제했습니다.'))
                    .then(() => {
                        setCurrentSubscription(null);
                    })
                    .finally(() => setIsLoading(false));
                return res;
            },
        });
    };

    return {currentSubscription, loadCurrentSubscription, isLoading, getBillingType, deleteCurrentSubscription};
};
