import {useQuery} from '@tanstack/react-query';
import {useOrgIdParam} from '^atoms/common';
import {notificationMessagesApi} from '../api';

export const useNotificationMessageUnreadCount = () => {
    const orgId = useOrgIdParam();
    return useQuery({
        queryKey: ['notificationMessages.unreadCount', orgId],
        queryFn: () => notificationMessagesApi.unreadCount(orgId).then((res) => res.data),
        initialData: 0,
        enabled: !!orgId,
    });
};
