import {api} from '^api/api';
import {FindAllAccountQueryDto} from '^models/CodefAccount/type/find-all-account.query.dto';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FindAllCardQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {ClassConstructor} from 'class-transformer';
import {FindAllSubscriptionByCardQueryDto} from '^models/CodefCard/type/find-all.card-subscription.query.dto';
import {SubscriptionDto} from '^models/Subscription/types';

/** [연동] Connect CODEF Accounts API */
export const codefAccountApi = {
    /** 계정 조회 (연동된 카드사 조회) */
    index(orgId: number, params?: FindAllAccountQueryDto) {
        const url = `/connect/organizations/${orgId}/codef/accounts`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefAccountDto));
    },

    /** 계정 상세 */
    show(orgId: number, codefAccountId: number) {
        const url = `/connect/organizations/${orgId}/codef/accounts/${codefAccountId}`;
        return api.get(url).then(oneDtoOf(CodefAccountDto));
    },

    /** 계정 등록 (카드사 연동 요청) */
    create(orgId: number, dto: CreateAccountRequestDto) {
        const url = `/connect/organizations/${orgId}/codef/accounts`;
        return api.post(url, dto).then(oneDtoOf(AccountCreatedResponseDto));
    },

    /** 코드에프 카드 조회 (보유카드 조회) - 계정의 카드 조회 */
    findCards<Dto = CodefCardDto, Query = FindAllCardQueryDto>(
        orgId: number,
        accountId: number,
        params: Query = {} as any,
    ) {
        const url = `/connect/organizations/${orgId}/codef/accounts/${accountId}/cards`;
        return api.get(url, {params}).then(paginatedDtoOf<Dto>(CodefCardDto as ClassConstructor<Dto>));
    },

    // 계정의 카드 동기화
    // patchCards<Dto = CodefCardDto, Query = FindAllCardQueryDto>(
    //     orgId: number,
    //     accountId: number,
    //     params: Query = {} as any,
    // ) {
    //     const url = `/connect/organizations/${orgId}/codef/accounts/${accountId}/cards`;
    //     return api.patch(url, {params}).then(listDtoOf<Dto>(CodefCardDto as ClassConstructor<Dto>));
    // },

    /** 연결된 구독 조회 */
    findSubscriptions(orgId: number, accountId: number, params?: FindAllSubscriptionByCardQueryDto) {
        const url = `/connect/organizations/${orgId}/codef/accounts/${accountId}/subscriptions`;
        return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },
};
