import {ClassConstructor} from 'class-transformer';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FindAllCardAdminQueryDto, FindAllCardQueryDto} from '^models/CodefCard/type/find-all.card.query.dto';
import {FindAllCardHistoryQueryDto} from '^models/CodefCard/type/find-all.card-history.query.dto';
import {RangeQueryDto} from '^models/CodefCard/type/range.query.dto';

/** [연동] Connect CODEF Cards API */
export const codefCardApi = {
    /** 코드에프 카드 조회 */
    index(orgId: number, params: FindAllCardQueryDto = {}) {
        const url = `/connect/organizations/${orgId}/codef/cards`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefCardDto));
    },

    // 코드에프 카드 상세 조회
    show<Dto = CodefCardDto>(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/cards/${id}`;
        return api.get(url).then(oneDtoOf<Dto>(CodefCardDto as ClassConstructor<Dto>));
    },

    // 코드에프 카드 삭제
    destroy(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/cards/${id}`;
        return api.delete(url).then(oneDtoOf(CodefCardDto));
    },

    // 스코디 카드 생성
    createCreditCard(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/cards/${id}/creditCard`;
        return api.post(url).then(oneDtoOf(CodefCardDto));
    },

    // 스코디 카드 연결
    connectCreditCard(orgId: number, id: number, creditCardId: number) {
        const url = `/connect/organizations/${orgId}/codef/cards/${id}/creditCard/${creditCardId}`;
        return api.patch(url).then(oneDtoOf(CodefCardDto));
    },

    /** 코드에프 결제내역 조회 (카드 등록 및 연동) */
    histories(orgId: number, codefCardId: number, params: FindAllCardHistoryQueryDto = {}) {
        const url = `/connect/organizations/${orgId}/codef/cards/${codefCardId}/histories`;
        return api.get(url, {params}); //.then(paginatedDtoOf(CodefCardDto));
    },

    // 코드에프 결제내역 패치 (코드에프 결제내역만 불러와서 저장)
    patchHistories(orgId: number, codefCardId: number, params: RangeQueryDto = {}) {
        const url = `/connect/organizations/${orgId}/codef/cards/${codefCardId}/histories`;
        return api.patch(url, {}, {params});
    },

    // 코드에프 구독 동기화
    patchSubscriptions(orgId: number, codefCardId: number) {
        const url = `/connect/organizations/${orgId}/codef/cards/${codefCardId}/subscriptions`;
        return api.patch(url);
    },
};

export const codefCardAdminApi = {
    index(params: FindAllCardAdminQueryDto) {
        const url = `/admin/codef-cards`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefCardDto));
    },

    // 카드 내역 및 구독 동기화
    sync(params: {orgId?: number}) {
        const url = `/admin/codef-cards/sync`;
        return api.patch<void>(url, {}, {params});
    },
};
