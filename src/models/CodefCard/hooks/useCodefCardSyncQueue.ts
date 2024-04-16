import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {atom, RecoilState, useRecoilState} from 'recoil';
import {codefCardApi} from '^models/CodefCard/api';
import {toast} from 'react-hot-toast';
import {ApiError} from '^api/api';
import {plainToInstance} from 'class-transformer';

export class CodefCardSyncRunningItem {
    orgId: number;
    codefCard: CodefCardDto;
    addedAt: Date;
    inProgress: boolean;

    get key() {
        return this.codefCard.id.toString();
    }

    static create(orgId: number, codefCard: CodefCardDto) {
        const item = new CodefCardSyncRunningItem();
        item.orgId = orgId;
        item.codefCard = codefCard;
        item.addedAt = new Date();
        item.inProgress = false;
        return item;
    }

    activate() {
        return plainToInstance(CodefCardSyncRunningItem, {...this, inProgress: true});
    }
}

// class CodefCardSyncQueue {
// }

export const codefCardSyncQueueAtom = atom<CodefCardSyncRunningItem[]>({
    key: 'codefCardSyncQueue/Atom',
    default: [],
});

export const isSyncRunningAtom = atom({
    key: 'codefCardSyncQueue/isSyncRunningAtom',
    default: false,
});

interface UseQueueConfig<T> {
    queueAtom: RecoilState<T[]>;
    getKey: (item: T) => string;
}

export function useQueue<T>(config: UseQueueConfig<T>) {
    const {queueAtom, getKey} = config;
    const [queue, setQueue] = useRecoilState(queueAtom);

    const equalKeyOf = (target: T) => (element: T) => getKey(element) === getKey(target);
    const exceptKeyOf = (target: T) => (element: T) => getKey(element) !== getKey(target);

    const push = (items: T[]) => {
        console.log('push.items', items);
        setQueue((oldItems) => {
            console.log('oldItems', oldItems);
            const addableItems = items.filter((item) => {
                // 기존 큐에 추가되어있지 않은 작업만 추가 할 수 있음.
                return !oldItems.find(equalKeyOf(item));
            });
            console.log('addableItems', addableItems);
            return addableItems.length ? [...oldItems, ...addableItems] : oldItems;
        });
    };

    const update = (items: T[]) => {
        console.log('update.items', items);
        setQueue((oldItems) => {
            return oldItems.map((item) => items.find(equalKeyOf(item)) || item);
        });
    };

    const remove = (item: T) => {
        setQueue((items) => {
            return items.filter(exceptKeyOf(item));
        });
    };

    return {queue, push, update, remove};
}

// export function useCodefCardSyncQueue() {
//     const [isSyncRunning, setIsSyncRunning] = useRecoilState(isSyncRunningAtom);
//     const {queue, push: pushQueue, filter: filterQueue} = useQueue({
//         queueAtom: codefCardSyncQueueAtom,
//         getKey: (item) => item.key,
//     });
//
//     const push = (item: CodefCardSyncRunningItem) => {
//         pushQueue(item);
//     };
//
//     const filter = (item: CodefCardSyncRunningItem) => {
//         filterQueue(item);
//     };
//
//     const syncCard = (item: CodefCardSyncRunningItem) => {
//         const {orgId, codefCard} = item;
//
//         setIsSyncRunning(true);
//         codefCardApi
//             .histories(orgId, codefCard.id, {sync: true})
//             .then((res) => {
//                 toast.success(`${codefCard.number4} 카드 싱크 완료`);
//                 return res;
//             })
//             .catch(catchError)
//             .finally(() => setIsSyncRunning(false));
//     };
//
//     return {queue, push, filter};
// }

function catchError(err: ApiError) {
    const apiError = err.response?.data;
    console.log(err);

    if (!apiError) {
        toast.error('문제가 발생했습니다.');
        return;
    }

    toast.error(apiError.message);
    console.error(apiError);
}
