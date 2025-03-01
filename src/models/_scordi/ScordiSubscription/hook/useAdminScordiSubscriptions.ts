import {useQuery} from '@tanstack/react-query';
import {adminScordiSubscriptionsApi} from '^models/_scordi/ScordiSubscription/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllScordiSubscriptionsForAdminDto} from '^models/_scordi/ScordiSubscription/type';
import {useState} from 'react';

export const useAdminScordiSubscriptions = (params: FindAllScordiSubscriptionsForAdminDto = {}) => {
    const [query, setQuery] = useState<FindAllScordiSubscriptionsForAdminDto>(params);
    const queryResult = useQuery({
        queryKey: ['useAdminScordiSubscriptionList', query],
        queryFn: () => adminScordiSubscriptionsApi.index(query).then((res) => res.data),
        initialData: Paginated.init(),
    });

    const search = setQuery;
    const clearQuery = () => search(params);

    return {
        ...queryResult,
        params: query,
        search: setQuery,
        clearQuery,
    };
};
