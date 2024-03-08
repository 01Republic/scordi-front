import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CodefCardDto} from './type/CodefCard.dto';
import {FindAllCardQueryDto} from './type/find-all.card.query.dto';
import {codefCardApi} from '^models/CodefCard/api';
import {
    connectedCodefCardsAtom,
    newCodefCardsAtom,
    subscriptionsForAccountAtom,
    subscriptionsForCardAtom,
} from '^models/CodefCard/atom';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllSubscriptionByCardQueryDto} from '^models/CodefCard/type/find-all.card-subscription.query.dto';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사의 카드 리스트를 보여줄 때 사용 */
export const useNewCodefCards = (codefAccountId: number) => useCodefCardsV3(codefAccountId, newCodefCardsAtom);
export const useConnectedCodefCards = (codefAccountId: number) =>
    useCodefCardsV3(codefAccountId, connectedCodefCardsAtom);

const useCodefCardsV3 = <DTO = CodefCardDto, QUERY = FindAllCardQueryDto>(
    codefAccountId: number,
    atoms: PagedResourceAtoms<DTO, QUERY>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefCardApi.index(orgId, codefAccountId, params),
        // @ts-ignore
        getId: 'id',
        mergeMode,
    });
};

export const useSubscriptionsForAccount = (codefAccountId: number) => {
    return useCodefSubscriptionsV3(codefAccountId, subscriptionsForAccountAtom);
};

export const useSubscriptionsForCard = (codefAccountId: number) => {
    return useCodefSubscriptionsV3(codefAccountId, subscriptionsForCardAtom);
};

const useCodefSubscriptionsV3 = (
    codefAccountId: number,
    atoms: PagedResourceAtoms<SubscriptionDto, FindAllSubscriptionByCardQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefCardApi.subscriptions(orgId, codefAccountId, params),
        // @ts-ignore
        getId: 'id',
        mergeMode,
    });
};
