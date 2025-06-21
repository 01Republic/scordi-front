import {memo} from 'react';
import {NotificationMessageDto} from '^models/_notification/NotificationMessage/types';
import {PageFlash} from '^clients/private/_layouts/_shared/PageFlash';

interface FlashNotificationMessageItemProps {
    item: NotificationMessageDto;
}

export const FlashNotificationMessageItem = memo((props: FlashNotificationMessageItemProps) => {
    const {item} = props;

    return (
        <PageFlash
            id={`notification-message-${item.id}`}
            text={item.title}
            type={'link'}
            theme={'notice'}
            url={item.url}
            animation
        />
    );
});
FlashNotificationMessageItem.displayName = 'FlashNotificationMessageItem';
