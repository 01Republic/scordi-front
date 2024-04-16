// 상태관리 전용 로컬 객체입니다.
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {atom, useRecoilState} from 'recoil';
import {dateSortBy} from '^components/util/date';

class CodefCardSyncRunningItem {
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
}

export const codefCardSyncRunningContainerAtom = atom<Record<string, CodefCardSyncRunningItem>>({
    key: 'CodefCard/SyncRunning/Container',
    default: {},
});

export function useCodefCardSyncRunningContainer() {
    const [container, setContainer] = useRecoilState(codefCardSyncRunningContainerAtom);

    const getQueue = () => Object.values(container).sort(dateSortBy('ASC', (item) => item.addedAt));
    const queue = getQueue();

    const find = (codefCardId: number) => {
        const key = `${codefCardId}`;
        return container[key] || null;
    };

    const create = (orgId: number, codefCards: CodefCardDto[]) => {
        setContainer((oldContainer) => {
            if (!codefCards.length) return oldContainer;

            const newContainer = {...oldContainer};
            codefCards.forEach((codefCard) => {
                const item = CodefCardSyncRunningItem.create(orgId, codefCard);
                newContainer[item.key] = item;
            });

            return newContainer;
        });
    };

    const destroy = (codefCardId: number) => {
        const key = `${codefCardId}`;
        setContainer((oldContainer) => {
            const newContainer = {...oldContainer};
            delete newContainer[key];
            return newContainer;
        });
    };

    return {container, find, create, destroy, queue, getQueue};
}
