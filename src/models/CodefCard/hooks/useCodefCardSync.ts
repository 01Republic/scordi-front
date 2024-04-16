import {toast} from 'react-hot-toast';
import {useEffect, useState} from 'react';
import {ApiError} from '^api/api';
import {codefCardApi} from '^models/CodefCard/api';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {atom, useRecoilState} from 'recoil';
import {
    codefCardSyncQueueAtom,
    CodefCardSyncRunningItem,
    isSyncRunningAtom,
    useQueue,
} from '^models/CodefCard/hooks/useCodefCardSyncQueue';

export function useCodefCardSync() {
    const [isSyncRunning, setIsSyncRunning] = useState(false);

    const syncCard = async (orgId: number, codefCard: CodefCardDto) => {
        if (!orgId || isNaN(orgId)) return;

        setIsSyncRunning(true);
        return codefCardApi
            .histories(orgId, codefCard.id, {sync: true})
            .then((res) => {
                toast.success(`${codefCard.number4} 카드 싱크 완료`);
                return res;
            })
            .catch(catchError)
            .finally(() => setIsSyncRunning(false));
    };

    return {syncCard, isSyncRunning};
}

export function useCodefCardSyncQueue() {
    const [isSyncRunning, setIsSyncRunning] = useRecoilState(isSyncRunningAtom);
    const {
        queue,
        push: pushQueue,
        update,
        remove,
    } = useQueue({
        queueAtom: codefCardSyncQueueAtom,
        getKey: (item) => item.key,
    });

    // private / 큐 옵저버
    useEffect(() => {
        const [task1, task2] = queue;
        console.log('useEffect');
        console.log('task1', task1);
        console.log('task2', task2);
        syncCardsByQueue([task1, task2]);
    }, [queue]);

    // private / 여러 작업들에 걸친 시퀀스를 다루고, 전체 큐 실행 시퀀스의 시작과 끝을 다룹니다.
    const syncCardsByQueue = async (givenTasks: CodefCardSyncRunningItem[]) => {
        // 주어진 테스크가 [undefined, undefined] 같은 경우를 걸러냅니다.;
        // 걸러낸 결과는 "진행중" 또는 "대기중" 상태의 테스크만 남습니다.
        const items = givenTasks.filter((e) => e);

        // 걸러낸 테스크의 결과가 0이면, 큐 내의 작업이 모두 완료된 것입니다.
        if (items.length === 0) {
            setIsSyncRunning(false);
            return;
        }

        // 이미 진행중이면 진행중인대로, 아직 대기중이면 지금 실행할 것이므로
        // 결국 전체 작업은 "진행중" 상태입니다.
        setIsSyncRunning(true);

        // 아직 시작하지 않은 "대기중" 테스크만 모읍니다.
        const notInProgress = items.filter((item) => !item.inProgress);

        // "대기중" 테스크가 있다면,
        if (notInProgress.length) {
            // 사실 대기중인 테스크가 빈 배열이어도 아래 과정을 실행하는데 문제는 없지만, 실행 효율을 위해 생략합니다.
            notInProgress.map((item) => syncCardByQueue(item));

            // "대기중"이던 작업을 "진행중"으로 변경하고
            const activatedItems = notInProgress.map((item) => item.activate());

            // 큐에 반영해 줍니다.
            // 이것으로 큐가 변경되어 useEffect 가 본 함수를 재실행 하게 되나,
            // "대기중" 필터에서 걸리므로 본 조건문 내부는 실행되지 않습니다.
            update(activatedItems);
        }
    };

    // private / 시퀀스내에서, 하나의 작업을 실행하는 방법을 정의합니다.
    const syncCardByQueue = async (item: CodefCardSyncRunningItem) => {
        const {orgId, codefCard} = item;

        // 이미 진입시에 "대기중"인 것만 입력하겠으나, 노파심에 한 번 더 걸러줍니다.
        if (item.inProgress) return;

        return (
            codefCardApi
                .histories(orgId, codefCard.id, {sync: true})
                .then((res) => {
                    toast.success(`${codefCard.number4} 카드 싱크 완료`);
                    return res;
                })
                .catch(catchError)
                // 본 작업이 끝나면 큐에서 제거해줍니다.
                // 큐에서 작업이 제거되면 큐 상태가 변경되는데
                // 이를 useEffect 에서 받아서 다음 테스크를 이어 실행하게 됩니다.
                .finally(() => remove(item))
        );
    };

    // [Public] 단일 카드 싱크 작업 등록
    const syncCard = async (orgId: number, codefCard: CodefCardDto) => {
        if (!orgId || isNaN(orgId)) return;

        // 작업을 생성합니다.
        const item = CodefCardSyncRunningItem.create(orgId, codefCard);

        // 만약에 동일한 정체성의 작업이 큐에 들어가더라도,
        // pushQueue 내부에서 검사하여 걸러냅니다.
        pushQueue([item]);
    };

    // [Public] 여러 카드 싱크 작업 등록
    const syncCardBatch = async (orgId: number, codefCards: CodefCardDto[]) => {
        if (!orgId || isNaN(orgId)) return;

        // 작업들을 생성합니다.
        const items = codefCards.map((codefCard) => {
            return CodefCardSyncRunningItem.create(orgId, codefCard);
        });

        // 만약에 동일한 정체성의 작업들이 큐에 들어가더라도,
        // pushQueue 내부에서 검사하여 걸러냅니다.
        pushQueue(items);
    };

    // [Public] 큐 헬퍼 / 큐에서 작업 찾기
    const getItemByCardId = (codefCardId: number) => {
        return queue.find((item) => item.codefCard.id === codefCardId);
    };

    return {queue, syncCard, syncCardBatch, isSyncRunning, getItemByCardId};
}

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
