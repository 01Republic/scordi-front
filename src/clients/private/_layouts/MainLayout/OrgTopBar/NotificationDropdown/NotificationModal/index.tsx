import React, {Dispatch, memo, SetStateAction} from 'react';
import {useSetRecoilState} from 'recoil';
import {Bell, X} from 'lucide-react';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {notificationFlashMessagesAtom} from '^models/_notification/NotificationSession/atom';
import {notificationSessionApi} from '^models/_notification/NotificationSession/api';
import {notificationMessagesApi} from '^models/_notification/NotificationMessage/api';
import {
    FindAllNotificationMessagesQueryDto,
    NotificationMessageDto,
} from '^models/_notification/NotificationMessage/types';
import {NotificationMessageItem} from './NotificationMessageItem';
import {eventCut} from '^utils/event';

interface NotificationModalProps {
    open: boolean;
    onClose: () => void;
    unreadCount: number;
    items: NotificationMessageDto[];
    params: FindAllNotificationMessagesQueryDto;
    search: Dispatch<SetStateAction<FindAllNotificationMessagesQueryDto>>;
    reload: () => any;
}

export const NotificationModal = memo((props: NotificationModalProps) => {
    const {open, onClose, unreadCount, items, params, search, reload} = props;
    const orgId = useOrgIdParam();
    const setFlashMessages = useSetRecoilState(notificationFlashMessagesAtom);

    // const items = [];
    // const items = dummyItems;
    // const items = data.items;
    // const {totalItemCount} = data.pagination;
    // const unreadItems = items.filter((item) => !item.readAt);

    const unreadAll = () => {
        notificationMessagesApi
            .updateAll(
                orgId,
                {
                    where: {
                        readAt: 'NULL',
                        sentAt: {op: 'not', val: 'NULL'},
                    },
                },
                {
                    readAt: new Date(),
                },
            )
            .then(() => {
                reload();
                setFlashMessages([]);
            })
            .catch(errorToast);
    };

    return (
        <AnimatedModal backdrop={{opacity: 0.0, className: ''}} open={open} onClose={onClose} allowScroll>
            <div className="fixed top-[56px] right-8 mx-auto max-w-80 w-full">
                <div className="w-4 h-4 absolute -top-2 right-[67px] bg-white border-t border-l shadow-xl rotate-45" />
                <div className={'bg-white rounded-2xl shadow-xl overflow-hidden'}>
                    <header className="pt-4 px-6 pb-2.5 border-b border-gray-400/30">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-18 font-bold" onClick={() => console.log(props)}>
                                알림{' '}
                                {unreadCount > 0 && (
                                    <span className="text-orange-600 ml-1">{unreadCount.toLocaleString()}</span>
                                )}
                            </h4>

                            <div>
                                <X
                                    fontSize={20}
                                    onClick={onClose}
                                    className="text-gray-700 hover:text-black cursor-pointer transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <p
                                className={`text-12 ${
                                    unreadCount > 0
                                        ? 'text-scordi hover:text-scordi-600 cursor-pointer'
                                        : 'text-gray-500/50 cursor-default'
                                } transition-all`}
                                onClick={() => unreadCount > 0 && unreadAll()}
                            >
                                모두 읽음 상태로 표시
                            </p>
                        </div>
                    </header>

                    <section className="">
                        {items.length > 0 ? (
                            <div className="w-full h-full max-h-[60vh] overflow-auto no-scrollbar">
                                {items.map((item, i) => (
                                    <NotificationMessageItem key={i} item={item} reload={reload} />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-full min-h-[60vh] flex items-center justify-center">
                                <div className="pb-6 text-gray-500/50 flex flex-col items-center gap-4">
                                    <Bell fontSize={28} />
                                    <div className="text-14">도착한 알림이 없습니다.</div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </AnimatedModal>
    );
});
