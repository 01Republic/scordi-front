import {memo, useState} from 'react';
import {Bell} from 'lucide-react';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {useOrgIdParam} from '^atoms/common';
import {notificationMessagesApi} from '^models/_notification/NotificationMessage/api';
import {FindAllNotificationMessagesQueryDto} from '^models/_notification/NotificationMessage/types';
import {NotificationModal} from './NotificationModal';

interface NotificationDropdownProps {
    //
}

export const NotificationDropdown = memo((props: NotificationDropdownProps) => {
    const {} = props;
    const [isOpened, setIsOpened] = useState(false);
    const orgId = useOrgIdParam();
    const [params, setParams] = useState<FindAllNotificationMessagesQueryDto>({
        where: {sentAt: {op: 'not', val: 'NULL'}},
        order: {sentAt: 'DESC'},
        page: 1,
        itemsPerPage: 100,
    });

    const {data, refetch} = useQuery({
        queryKey: ['notificationMessages.my.allReceived', orgId, params],
        queryFn: () => notificationMessagesApi.index(orgId, params).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId,
    });

    const count = data.pagination.totalItemCount || 5; // 읽지 않은 갯수여야 함.

    return (
        <>
            <div
                className={`relative ${
                    isOpened ? 'text-scordi-500' : 'text-gray-400 hover:text-scordi-500'
                } transition-all cursor-pointer`}
                onClick={() => setIsOpened(true)}
            >
                <Bell className={`size-5`} />
                {count > 0 && (
                    <span className="absolute top-[0px] right-[3px] text-[9px] text-white bg-red-500 w-[6px] h-[6px] rounded-full flex items-center justify-center font-bold">
                        {/*{count.toLocaleString()}*/}
                    </span>
                )}
            </div>

            <NotificationModal
                open={isOpened}
                onClose={() => setIsOpened(false)}
                data={data}
                params={params}
                search={setParams}
                reload={refetch}
            />
        </>
    );
});
NotificationDropdown.displayName = 'NotificationDropdown';
