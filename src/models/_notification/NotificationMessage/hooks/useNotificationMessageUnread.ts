import {useQuery} from '@tanstack/react-query';
import {useOrgIdParam} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {notificationMessagesApi} from '../api';

export const useNotificationMessageUnread = () => {
    const orgId = useOrgIdParam();

    const queryResult = useQuery({
        queryKey: ['notificationMessages.unread', orgId],
        queryFn: () => notificationMessagesApi.findByUnread(orgId).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const unreadCount = queryResult.data.pagination.totalItemCount; // 안읽은 메세지 갯수는 이게 맞음.

    return {...queryResult, unreadCount};
};
