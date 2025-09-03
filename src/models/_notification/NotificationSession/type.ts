import {NotificationMessageDto} from '^models/_notification/NotificationMessage/types';
import {TypeCast} from '^types/utils/class-transformer';

export enum NotificationMessageEventType {
    FLASH = 'flash',
}

export class NotificationMessageEvent {
    type: NotificationMessageEventType;

    @TypeCast(() => NotificationMessageDto)
    data: NotificationMessageDto;
}

export class NotificationSessionTestQuery {
    isAppend?: boolean;
}
