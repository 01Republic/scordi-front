import {EventSourcePolyfill, NativeEventSource, MessageEvent} from 'event-source-polyfill';
import {api, getToken} from '^api/api';
import {log2} from '^utils/log';

/**
 * [알림] 알림 구독 세션 API
 */
export const notificationSessionApi = {
    /**
     * 구독 세션 생성
     * - 구독 시작
     */
    create(orgId: number, {onMessage, onError}: {onMessage: (data: string) => any; onError?: (error: any) => any}) {
        const token = getToken();
        if (!token) return;

        try {
            // SSE 연결 설정
            const baseUrl = api.defaults.baseURL;
            const url = `${baseUrl}/organizations/${orgId}/notification-session`;
            const EventSource = EventSourcePolyfill || NativeEventSource;
            const eventSource = new EventSource(url, {
                headers: {Authorization: `Bearer ${token}`},
                heartbeatTimeout: 30 * 60 * 1000, // 30분마다 heartbeat 체크
            });

            // 연결 성공 이벤트
            eventSource.addEventListener('connect', (event: any) => {
                log2(event); // 연결 완료 콜백 호출
                if (event.data === 'SSE 연결이 완료되었습니다.') {
                    // onConnect?.(); // 연결 완료 콜백 호출
                }
            });

            // 메시지 수신 이벤트
            eventSource.addEventListener('message', (event: MessageEvent) => {
                onMessage(event.data); // 메시지 처리
            });

            // 에러 처리
            eventSource.onerror = (error: any) => {
                if (error?.error?.message) {
                    log2(error.error.message);
                } else {
                    log2('SSE Error:', error);
                    // console.log(error instanceof MessageEvent);
                    // const e = {
                    //     type: 'error',
                    //     data: 'Request Timeout',
                    //     lastEventId: '1',
                    // };
                    // console.log(error instanceof ErrorEvent);
                    // const e = {
                    //     type: 'error',
                    // };
                }
                onError?.(error); // 에러 콜백 호출
                // eventSource.close(); // 연결 종료
            };

            return eventSource;
        } catch (e) {
            return;
        }
    },

    test(orgId: number) {
        return api.get(`/organizations/${orgId}/notification-session/test`);
    },

    /**
     * 구독 세션 삭제
     * - 구독 종료
     */
    destroy(orgId: number) {
        return api.delete(`/organizations/${orgId}/notification-session`);
    },
};
