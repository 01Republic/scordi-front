import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {useOrgIdParam} from '^atoms/common';
import {NotificationMessageEvent, NotificationMessageEventType} from '^models/_notification/NotificationSession/type';
import {NotificationMessageDto} from '^models/_notification/NotificationMessage/types';
import {notificationSessionApi} from '../api';
import {notificationFlashMessagesAtom} from '../atom';

interface Props {
    reload: () => any;
}

export const SseFlashMessageConnector = (props: Props) => {
    const {reload} = props;
    const orgId = useOrgIdParam();
    const setFlashMessages = useSetRecoilState(notificationFlashMessagesAtom);

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

    if (!orgId) return <></>;

    return <></>;
};
