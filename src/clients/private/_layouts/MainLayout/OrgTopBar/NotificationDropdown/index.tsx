import {memo, useState} from 'react';
import {Bell} from 'lucide-react';
import {SseFlashMessageConnector} from '^models/_notification/NotificationSession/components';
import {
    useNotificationMessageUnreadCount,
    useNotificationMessageReceived,
} from '^models/_notification/NotificationMessage/hooks';
import {NotificationModal} from './NotificationModal';

export const NotificationDropdown = memo(() => {
    const [isOpened, setIsOpened] = useState(false);
    const unreadCountQuery = useNotificationMessageUnreadCount();
    const receivedQuery = useNotificationMessageReceived();

    const reload = () => {
        unreadCountQuery.refetch();
        receivedQuery.refetch();
    };

    return (
        <>
            <SseFlashMessageConnector reload={reload} />
            <div
                className={`relative ${
                    isOpened ? 'text-scordi-500' : 'text-gray-400 hover:text-scordi-500'
                } transition-all cursor-pointer`}
                onClick={() => setIsOpened(true)}
            >
                <Bell className={`size-5`} />
                {unreadCountQuery.data > 0 && (
                    <span className="absolute top-[0px] right-[3px] text-[9px] text-white bg-red-500 w-[6px] h-[6px] rounded-full flex items-center justify-center font-bold">
                        {/*{count.toLocaleString()}*/}
                    </span>
                )}
            </div>

            <NotificationModal
                open={isOpened}
                onClose={() => setIsOpened(false)}
                unreadCount={unreadCountQuery.data}
                data={receivedQuery.data}
                params={receivedQuery.query}
                search={receivedQuery.search}
                reload={reload}
            />
        </>
    );
});
NotificationDropdown.displayName = 'NotificationDropdown';
