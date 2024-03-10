import {atom} from 'recoil';
import {pagedResourceAtom} from '^hooks/usePagedResource';
import {ConnectedCodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FindAllCardQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllSubscriptionByCardQueryDto} from '^models/CodefCard/type/find-all.card-subscription.query.dto';

export enum CardListPageMode {
    ConnectedCards,
    NewCards,
    IsLoading,
}

export const cardListPageModeAtom = atom<CardListPageMode>({
    key: 'cardListPageMode',
    default: CardListPageMode.IsLoading,
});

export const reloadingDataAtom = atom({
    key: 'reloadingDataAtom',
    default: false,
});
