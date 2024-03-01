import {api} from '^api/api';

/** [연동] Connect CODEF Cards API */
export const codefCardApi = {
    /** 코드에프 카드 조회 (보유카드 조회) */
    index(orgId: number, accountId: number) {
        const url = `/connect/organizations/${orgId}/codef/accounts/${accountId}/cards`;
        return api.get(url, {});
    },
    //
    // /** 승인내역 */
    // approval() {
    //     const url = `/v1/kr/card/b/account/approval-list`;
    //     return this.requestProduct(url, {});
    // },
    //
    // /** 청구내역 */
    // billing() {
    //     const url = `/v1/kr/card/b/account/billing-list`;
    //     return this.requestProduct(url, {});
    // },
    //
    // /** 매입내역 */
    // purchase() {
    //     const url = `v1/kr/card/b/account/purchase-details`;
    //     return this.requestProduct(url, {});
    // },
};
