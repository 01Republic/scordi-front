import React, {memo} from 'react';
import {formatDate} from '^utils/dateTime';
import {ChevronRight} from 'lucide-react';
import {NotificationMessageDto} from '^models/_notification/NotificationMessage/types';
import {LinkTo} from '^components/util/LinkTo';

interface NotificationMessageItemProps {
    item: NotificationMessageDto;
    reload?: () => any;
}

export const NotificationMessageItem = memo((props: NotificationMessageItemProps) => {
    const {item, reload} = props;

    return (
        <LinkTo
            href={item.url}
            target={`${item.url}`.startsWith('http') ? '_blank' : undefined}
            className="!outline-none group py-2.5 px-6 border-b border-gray-400/30 font-semibold cursor-pointer hover:bg-gray-50 transition-all flex items-center"
            displayLoading={false}
        >
            <div className="flex-1">
                {item.sentAt && (
                    <div
                        className={`text-12 ${
                            item.readAt ? 'text-gray-500/50 group-hover:text-gray-500' : 'text-orange-600'
                        } transition-all flex items-center gap-1 mb-1`}
                    >
                        <span>{formatDate(item.sentAt)}</span> {!item.readAt && <small>●</small>}
                    </div>
                )}
                <div
                    className={`text-14 ${
                        item.readAt ? 'text-gray-500/50 group-hover:text-gray-500 transition-all' : 'text-black'
                    }`}
                >
                    {item.title}
                </div>
            </div>

            <div className="flex items-center ml-2">
                <ChevronRight size={20} className="text-gray-400 group-hover:text-black transition-all" />
            </div>
        </LinkTo>
    );
});
NotificationMessageItem.displayName = 'NotificationMessageItem';
