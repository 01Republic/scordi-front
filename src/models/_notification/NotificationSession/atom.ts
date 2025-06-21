import {atom} from 'recoil';
import {NotificationMessageDto} from '../NotificationMessage/types';

export const notificationFlashMessagesAtom = atom<NotificationMessageDto[]>({
    key: 'notificationFlashMessagesAtom',
    default: [],
});
