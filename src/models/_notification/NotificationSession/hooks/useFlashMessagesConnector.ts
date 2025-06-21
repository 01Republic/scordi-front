import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {useOrgIdParam} from '^atoms/common';
import {notificationFlashMessagesAtom} from '^models/_notification/NotificationSession/atom';
import {notificationSessionApi} from '^models/_notification/NotificationSession/api';
import {NotificationMessageEvent, NotificationMessageEventType} from '^models/_notification/NotificationSession/type';
import {
    useNotificationMessageReceived,
    useNotificationMessageUnread,
} from '^models/_notification/NotificationMessage/hooks';

interface FlashMessagesConnectorOption {
    reload?: () => any;
}

export function useFlashMessagesConnector(option: FlashMessagesConnectorOption = {}) {
    const orgId = useOrgIdParam();
    const setFlashMessages = useSetRecoilState(notificationFlashMessagesAtom);
    const unreadCountQuery = useNotificationMessageUnread();
    const receivedQuery = useNotificationMessageReceived();

    const reload = () => {
        unreadCountQuery.refetch();
        receivedQuery.refetch();
        if (option.reload) option.reload();
    };

    useEffect(() => {
        if (!orgId) return;

        // SSE 연결 설정
        const eventSource = notificationSessionApi.create(orgId, {
            onMessage: (rawData) => {
                const event = plainToInstance(NotificationMessageEvent, JSON.parse(rawData || '{}'));
                if (event.type === NotificationMessageEventType.FLASH) {
                    // 읽지않은 메세지를 재호출합니다. (어차피 호출해야 합니다.)
                    // 이벤트데이터를 여기서 전역상태에 바로 추가하지 않고,
                    // 읽지않은 메세지의 조회결과에 의해서만 업데이트 되도록 의존하게 함으로써
                    // 단방향 데이터 흐름을 유지합니다.
                    reload();
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

    useEffect(() => {
        setFlashMessages(unreadCountQuery.visibleItems);
    }, [unreadCountQuery.visibleItems]);
}
