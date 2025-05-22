import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {CodefBankAccountDto} from './type/CodefBankAccount.dto';
import {FindAllBankAccountQueryDto} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';

/**
 * [연동] Connect CODEF Bank Accounts API
 */
export const codefBankAccountApi = {
    /**
     * 코드에프 계좌 조회
     */
    index(orgId: number, params: FindAllBankAccountQueryDto = {}) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefBankAccountDto));
    },

    /**
     * 코드에프 계좌 상세 조회
     */
    show(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}`;
        return api.get(url).then(oneDtoOf(CodefBankAccountDto));
    },

    /**
     * 코드에프 계좌 삭제
     */
    destroy(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}`;
        return api.delete(url).then(oneDtoOf(CodefBankAccountDto));
    },

    /**
     * 스코디 계좌 생성
     */
    createBankAccount(orgId: number, id: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}/bankAccount`;
        return api.post(url).then(oneDtoOf(CodefBankAccountDto));
    },

    /**
     * 스코디 계좌 연결
     */
    connectBankAccount(orgId: number, id: number, bankAccountId: number) {
        const url = `/connect/organizations/${orgId}/codef/bank-accounts/${id}/bankAccount/${bankAccountId}`;
        return api.patch(url).then(oneDtoOf(CodefBankAccountDto));
    },

    // /**
    //  * 계좌 상세 조회
    //  */
    // show() {
    //     //
    // },
    //
    // /**
    //  * 계좌 상세 조회
    //  */
    // show() {
    //     //
    // },
    //
    // /**
    //  * 계좌 상세 조회
    //  */
    // show() {
    //     //
    // },
};
