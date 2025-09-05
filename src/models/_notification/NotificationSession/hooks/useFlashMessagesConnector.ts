import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {useOrgIdParam} from '^atoms/common';
import {receivedNotificationMessagesAtom} from '^models/_notification/NotificationSession/atom';
import {notificationSessionApi} from '^models/_notification/NotificationSession/api';
import {NotificationMessageEvent} from '^models/_notification/NotificationSession/type';

interface FlashMessagesConnectorOption {
    reload?: () => any;
}

/**
 * Flash 알림 메세지를 수신하는 SSE 연결을 관장합니다.
 */
export function useFlashMessagesConnector(option: FlashMessagesConnectorOption = {}) {
    const orgId = useOrgIdParam();
    const setReceivedMessages = useSetRecoilState(receivedNotificationMessagesAtom);

    useEffect(() => {
        if (!orgId) return;

        // SSE 연결 설정
        const eventSource = notificationSessionApi.create(orgId, {
            onMessage: (rawData) => {
                const event = plainToInstance(NotificationMessageEvent, JSON.parse(rawData || '{}'));
                setReceivedMessages((prev = []) => [event.data, ...prev]);
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
