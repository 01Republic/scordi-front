import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useOrgIdParam} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {notificationMessagesApi} from '../api';
import {FindAllNotificationMessagesQueryDto} from '../types';

export const useNotificationMessageReceived = () => {
    const orgId = useOrgIdParam();

    const [query, setQuery] = useState<FindAllNotificationMessagesQueryDto>({
        where: {sentAt: {op: 'not', val: 'NULL'}},
        order: {sentAt: 'DESC'},
        page: 1,
        itemsPerPage: 100,
    });

    const receivedQuery = useQuery({
        queryKey: ['notificationMessages.my.allReceived', orgId, query],
        queryFn: () => notificationMessagesApi.index(orgId, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId,
    });

    return {query, search: setQuery, ...receivedQuery};
};
