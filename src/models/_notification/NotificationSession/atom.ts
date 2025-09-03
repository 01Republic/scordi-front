import {atom} from 'recoil';
import {NotificationMessageDto} from '../NotificationMessage/types';
import {localStorageEffect} from '^atoms/localStorageEffect';

/**
 * 이 곳에서는 디비조회를 통해 가져온 메세지 'NotificationMessageDto' 만 다룹니다.
 */

// 현재 화면에 표시되고 있는 플래시 메세지
export const notificationFlashMessagesAtom = atom<NotificationMessageDto[]>({
    key: 'notificationFlashMessagesAtom',
    default: [],
});

// 숨김 처리된 플래시 메세지 (경량화를 위해 필수식별값(ID, 숨긴시각)만 저장)
export const notificationHiddenMessagesAtom = atom<{id: number; hideAt: Date}[]>({
    key: 'notificationHiddenMessageIdsAtom',
    default: [],
    effects: [localStorageEffect('notificationHiddenMessageIds')],
});
