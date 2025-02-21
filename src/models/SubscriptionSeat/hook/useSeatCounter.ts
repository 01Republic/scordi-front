import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllSubscriptionSeatQueryDto} from '^models/SubscriptionSeat/type';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {subscriptionApi} from '^models/Subscription/api';

export const useSeatCounter = (subscription: SubscriptionDto | null, params: FindAllSubscriptionSeatQueryDto = {}) => {
    const [query, setQuery] = useState(params);
    const {data: count, refetch} = useQuery({
        queryKey: ['useSeatCounter', subscription?.id, query],
        queryFn: () => {
            if (!subscription) return 0;
            const orgId = subscription.organizationId;
            const id = subscription.id;
            return subscriptionApi.seatsApi.index(orgId, id, query).then((result) => {
                return result.data.pagination.totalItemCount;
            });
        },
        enabled: !!subscription,
        initialData: 0,
    });

    return {count, refetch};
};
