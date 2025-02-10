import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    BankAccountDto,
    FindAllBankAccountQueryDto,
    CreateBankAccountRequestDto,
    UpdateBankAccountRequestDto,
} from '^models/BankAccount/type';

/**
 * 계좌 API
 */
export const bankAccountApi = {
    // 계좌 목록
    index(orgId: number, params?: FindAllBankAccountQueryDto) {
        const url = `/organizations/${orgId}/bank-accounts`;
        return api.get(url, {params}).then(paginatedDtoOf(BankAccountDto));
    },

    // 계좌 등록
    create(orgId: number, dto: CreateBankAccountRequestDto) {
        const url = `/organizations/${orgId}/bank-accounts`;
        return api.post(url, dto).then(oneDtoOf(BankAccountDto));
    },

    // 계좌 상세
    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/bank-accounts/${id}`;
        return api.get(url).then(oneDtoOf(BankAccountDto));
    },

    // 계좌 수정
    update(orgId: number, id: number, dto: UpdateBankAccountRequestDto) {
        const url = `/organizations/${orgId}/bank-accounts/${id}`;
        return api.patch(url, dto).then(oneDtoOf(BankAccountDto));
    },

    // 계좌 삭제
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/bank-accounts/${id}`;
        return api.delete(url).then(oneDtoOf(BankAccountDto));
    },
};
