import {api} from '^api/api';
import {FindAllAccountQueryDto} from '^models/CodefAccount/type/find-all-account.query.dto';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';

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
};
