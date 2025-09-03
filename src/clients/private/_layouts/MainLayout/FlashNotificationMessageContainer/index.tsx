import React, {memo} from 'react';
import {useFlashMessages} from '^models/_notification/NotificationSession/hooks';
import {FlashNotificationMessageItem} from './FlashNotificationMessageItem';

export const FlashNotificationMessageContainer = memo(function FlashNotificationMessageContainer() {
    const flashMessages = useFlashMessages();

    return (
        <div className="w-full">
            <div id="page-flash" className="relative" />

            {flashMessages.map((message) => (
                <FlashNotificationMessageItem key={message.id} item={message} />
            ))}
        </div>
    );
});
