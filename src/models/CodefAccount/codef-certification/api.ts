import {api} from '^api/api';
import {JwtContainer} from '^models/User/types';

/** [인증] CODEF Certification API */
export const codefCertApi = {
    /** 코드에프 토큰 조회 */
    token() {
        const url = `/codef/cert/token`;
        return api.get<JwtContainer>(url);
    },
};
