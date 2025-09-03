import {useRecoilState} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import {useOrgIdParam} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {notificationHiddenMessagesAtom} from '^models/_notification/NotificationSession/atom';
import {notificationMessagesApi} from '../api';

export const useNotificationMessageUnread = () => {
    const orgId = useOrgIdParam();
    const [hiddenMessages, setHiddenMessages] = useRecoilState(notificationHiddenMessagesAtom);
    const queryResult = useQuery({
        queryKey: ['notificationMessages.unread', orgId],
        queryFn: () => notificationMessagesApi.findByUnread(orgId).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId,
    });

    const removeOne = (id: number) => {
        setHiddenMessages((prev) => [...prev, {id, hideAt: new Date()}]);
        queryResult.refetch();
    };

    const unreadCount = queryResult.data.pagination.totalItemCount; // 안읽은 메세지 갯수는 이게 맞음.

    // 숨기지 않은 메세지 (숨김은 로컬스토리지에 저장하고 있음)
    const visibleItems = queryResult.data.items.filter(
        (item) => !hiddenMessages.some((hidden) => hidden.id === item.id),
    );
    const visibleCount = visibleItems.length;

    return {...queryResult, visibleItems, visibleCount, unreadCount, removeOne};
};
