import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {ClassConstructor} from 'class-transformer';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {FindAllBankAccountQueryDto} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';
import {RangeQueryDto} from '^models/CodefBankAccount/type/range.query.dto';

/** [연동] Connect CODEF BankAccount API */
export const codefBankAccountApi = {
    /** 코드에프 계좌 조회 */
    index(orgId: number, params: FindAllBankAccountQueryDto = {}) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefBankAccountDto));
    },

    /** 코드에프 계좌 상세 조회 */
    show<Dto = CodefBankAccountDto>(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}`;
        return api.get(url).then(oneDtoOf<Dto>(CodefBankAccountDto as ClassConstructor<Dto>));
    },

    /** 코드에프 계좌 삭제 */
    destroy(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}`;
        return api.delete(url).then(oneDtoOf(CodefBankAccountDto));
    },

    /** 스코디 계좌 생성 */
    createBankAccount(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}/bankAccount`;
        return api.post(url).then(oneDtoOf(CodefBankAccountDto));
    },

    /** 스코디 계좌 연결 */
    connectBankAccount(orgId: number, id: number, bankAccountId: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}/bankAccount/${bankAccountId}`;
        return api.patch(url).then(oneDtoOf(CodefBankAccountDto));
    },

    /** 코드에프 수시입출내역 조회 */
    histories(orgId: number, codefBankAccountId: number, params: FindAllBankAccountQueryDto = {}) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${codefBankAccountId}/histories`;
        return api.get(url, {params});
    },

    /** 코드에프 수시입출내역 패치 (코드에프 수시입출내역만 불러와서 저장) */
    patchHistories(orgId: number, codefBankAccountId: number, params: RangeQueryDto = {}) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${codefBankAccountId}/histories`;
        return api.patch(url, {}, {params});
    },
};
