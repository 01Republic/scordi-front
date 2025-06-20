import {useQuery} from '@tanstack/react-query';
import {SubscriptionDto} from '^models/Subscription/types';
import {creditCardApi} from '^models/CreditCard/api';

/** 구독상세 페이지 전용 훅 / 구독에 연결된 카드 조회 */
export const useCreditCardOfSubscription = (subscription: SubscriptionDto) => {
    const {id, organizationId: orgId, creditCardId} = subscription;

    return useQuery({
        queryKey: ['subscription.creditCard', id, creditCardId],
        queryFn: async () => {
            return creditCardApi.show(orgId, creditCardId!).then((res) => res.data);
        },
        enabled: !!creditCardId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};
