import {memo, useState} from 'react';
import {Bell} from 'lucide-react';
import {
    useNotificationMessageUnread,
    useNotificationMessageReceived,
} from '^models/_notification/NotificationMessage/hooks';
import {NotificationModal} from './NotificationModal';
import {useRecoilValue} from 'recoil';
import {receivedNotificationMessagesAtom} from '^models/_notification/NotificationSession/atom';

export const NotificationDropdown = memo(() => {
    const [isOpened, setIsOpened] = useState(false);
    const receivedMessages = useRecoilValue(receivedNotificationMessagesAtom);
    const unreadCountQuery = useNotificationMessageUnread();
    const receivedQuery = useNotificationMessageReceived();

    const oldMessages = receivedQuery.data.items;
    const newReceivedMessages = receivedMessages.filter((msg) => !oldMessages.find((m) => m.id === msg.id));
    const items = [...newReceivedMessages, ...oldMessages];

    const unreadCount = unreadCountQuery.unreadCount + newReceivedMessages.length;

    const reload = () => {
        unreadCountQuery.refetch();
        receivedQuery.refetch();
    };

    return (
        <>
            <div
                className={`relative ${
                    isOpened ? 'text-scordi-500' : 'text-gray-400 hover:text-scordi-500'
                } transition-all cursor-pointer`}
                onClick={() => setIsOpened(true)}
            >
                <Bell className={`size-5`} />
                {unreadCount > 0 && (
                    <span className="absolute top-[0px] right-[3px] text-[9px] text-white bg-red-500 w-[6px] h-[6px] rounded-full flex items-center justify-center font-bold">
                        {/*{count.toLocaleString()}*/}
                    </span>
                )}
            </div>

            <NotificationModal
                open={isOpened}
                onClose={() => setIsOpened(false)}
                unreadCount={unreadCount}
                items={items}
                params={receivedQuery.query}
                search={receivedQuery.search}
                reload={reload}
            />
        </>
    );
});
NotificationDropdown.displayName = 'NotificationDropdown';
