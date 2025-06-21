import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {useOrgIdParam} from '^atoms/common';
import {notificationFlashMessagesAtom} from '^models/_notification/NotificationSession/atom';
import {NotificationMessageDto} from '^models/_notification/NotificationMessage/types';
import {notificationSessionApi} from '^models/_notification/NotificationSession/api';
import {NotificationMessageEvent, NotificationMessageEventType} from '^models/_notification/NotificationSession/type';
import {
    useNotificationMessageReceived,
    useNotificationMessageUnreadCount,
} from '^models/_notification/NotificationMessage/hooks';

interface FlashMessagesConnectorOption {
    reload?: () => any;
}

export function useFlashMessagesConnector(option: FlashMessagesConnectorOption = {}) {
    const orgId = useOrgIdParam();
    const setFlashMessages = useSetRecoilState(notificationFlashMessagesAtom);
    const unreadCountQuery = useNotificationMessageUnreadCount();
    const receivedQuery = useNotificationMessageReceived();

    const reload = () => {
        unreadCountQuery.refetch();
        receivedQuery.refetch();
        if (option.reload) option.reload();
    };

    const appendFlash = (message: NotificationMessageDto) => {
        setFlashMessages((prev) => [...prev, message]);
        reload();
    };

    useEffect(() => {
        if (!orgId) return;

        // SSE 연결 설정
        const eventSource = notificationSessionApi.create(orgId, {
            onMessage: (rawData) => {
                const event = plainToInstance(NotificationMessageEvent, JSON.parse(rawData || '{}'));
                if (event.type === NotificationMessageEventType.FLASH) {
                    appendFlash(event.data);
                }
            },
            onError: (error) => {
                // console.log('onError', error);
            },
        });

        return () => {
            eventSource?.close();
        };
    }, [orgId]);
}
