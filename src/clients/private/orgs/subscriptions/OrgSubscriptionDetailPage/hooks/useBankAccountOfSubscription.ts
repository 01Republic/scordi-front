import {useQuery} from '@tanstack/react-query';
import {SubscriptionDto} from '^models/Subscription/types';
import {bankAccountApi} from '^models/BankAccount/api';

/** 구독상세 페이지 전용 훅 / 구독에 연결된 계좌 조회 */
export const useBankAccountOfSubscription = (subscription: SubscriptionDto) => {
    const {id, organizationId: orgId, bankAccountId} = subscription;

    return useQuery({
        queryKey: ['subscription.bankAccount', id, bankAccountId],
        queryFn: async () => {
            return bankAccountApi.show(orgId, bankAccountId!).then((res) => res.data);
        },
        enabled: !!bankAccountId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};
