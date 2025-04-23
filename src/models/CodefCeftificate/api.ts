//

import {api} from '^api/api';

/* 코드에프 공인인증서 - 토큰을 발급받기 위한 함수
 * 공동인증서 목록을 조회 하기 전 권한 확인을 위해 토큰을 발급받는 단계
 */
export const codefCertificateApi = {
    async index() {
        const url = '/codef/cert/token';
        return api.get(url).then((res) => {
            return res.data as {token: string};
        });
    },
};
