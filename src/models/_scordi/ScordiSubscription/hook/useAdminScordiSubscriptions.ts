import {useQuery} from '@tanstack/react-query';
import {adminScordiSubscriptionsApi} from '^models/_scordi/ScordiSubscription/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllScordiSubscriptionsForAdminDto} from '^models/_scordi/ScordiSubscription/type';

export const useAdminScordiSubscriptions = (params: FindAllScordiSubscriptionsForAdminDto = {}) => {
    const query = useQuery({
        queryKey: ['useAdminScordiSubscriptionList', params],
        queryFn: () => adminScordiSubscriptionsApi.index(params).then((res) => res.data),
        initialData: Paginated.init(),
    });

    return {...query};
};
