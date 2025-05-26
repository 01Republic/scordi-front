import {pagedResourceAtom} from '^hooks/usePagedResource';
import {CodefCardDto, ConnectedCodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FindAllCardAdminQueryDto, FindAllCardQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllSubscriptionByCardQueryDto} from '^models/CodefCard/type/find-all.card-subscription.query.dto';
import {atom} from 'recoil';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

/** 코드에프 카드 리스트 */
export const codefCardsAtom = pagedResourceAtom<CodefCardDto, FindAllCardQueryDto>({
    key: 'codefCardsAtom',
});

/** 카드 상세 페이지에서, 연결된 코드에프 카드를 불러올때 사용 */
export const codefCardsOfCreditCardShowAtom = pagedResourceAtom<CodefCardDto, FindAllCardQueryDto>({
    key: 'codefCardsOfCreditCardShowAtom',
});

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사의 카드 리스트를 보여줄 때 사용 */
export const newCodefCardsAtom = pagedResourceAtom<CodefCardDto, FindAllCardQueryDto>({
    key: 'newCodefCardsAtom',
});
export const connectedCodefCardsAtom = pagedResourceAtom<
    ConnectedCodefCardDto,
    FindAllCardQueryDto<ConnectedCodefCardDto>
>({
    key: 'connectedCodefCardsAtom',
});

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사의 카드 리스트를 보여줄 때 사용 */
export const subscriptionsForAccountAtom = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionByCardQueryDto>({
    key: 'subscriptionsForAccountAtom',
});

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사의 카드 리스트를 보여줄 때 사용 */
export const subscriptionsForCardAtom = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionByCardQueryDto>({
    key: 'subscriptionsForCardAtom',
});

export const codefCardsAdminAtom = pagedResourceAtom<CodefCardDto, FindAllCardAdminQueryDto>({
    key: 'codefCardsAdminAtom',
});

//구독 불러오기 - 스코디 카드를 생성한 codefCards 담기
export const subscriptionConnectedCodefCardsAtom = atom<CodefCardDto[]>({
    key: 'subscriptionConnectedCodefCardsAtom',
    default: [],
});

//구독 불러오기 - 스코디 계좌를 생성한 codefBanks 담기
export const subscriptionConnectedCodefBanksAtom = atom<CodefBankAccountDto[]>({
    key: 'subscriptionConnectedCodefBanksAtom',
    default: [],
});

//자산 연동 - 스코디 카드를 생성한 codefCards 담기
export const assetConnectedCodefCardsAtom = atom<CodefCardDto[]>({
    key: 'assetConnectedCodefCardsAtom',
    default: [],
});

//자산 연동 - 스코디 계좌를 생성한 codefBanks 담기
export const assetConnectedCodefBanksAtom = atom<CodefBankAccountDto[]>({
    key: 'assetConnectedCodefBanksAtom',
    default: [],
});
