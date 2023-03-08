import {LoginDto, LoginWithVerify, OrgBillingDto, OrgItemDto, OrgProfileDto} from '^types/crawler';
import {api} from '^api/api';
import {OrgBillingHistoryDto} from '^types/crawler/org-billing-history.dto';
import {OrgMemberDto} from '^types/crawler/org-member.dto';
import CryptoJS from 'crypto-js';

/**
 * [크롤러] 서비스 연동 API
 */
const CRAWLER_SIGN_SECRET = process.env.NEXT_PUBLIC_CRAWLER_SIGN_SECRET as string;
const makeSignHeader = (params: LoginDto | LoginWithVerify) => {
    const loginData = JSON.stringify(params);
    const encrypted = CryptoJS.AES.encrypt(loginData, CRAWLER_SIGN_SECRET).toString();
    return {'Crawler-Sign': encrypted};
};

// OK [Step 1] 서비스에서 연동할 조직 목록을 가져오기 *
// OK [Step 1-1] 조직 목록 가져오기2 (서비스에서 2FA 또는 기기 인증 코드를 요청할때) *
export function getOrganizationListByCrawlerApi(prototypeId: number, params: LoginDto | LoginWithVerify) {
    const url = (params as any).verificationCode
        ? `/crawler/${prototypeId}/organizations/verify`
        : `/crawler/${prototypeId}/organizations`;
    const headers = makeSignHeader(params);
    return api.get<OrgItemDto[]>(url, {headers});
}

// [Step 2] 서비스에서 연동할 조직의 세부 정보 가져오기 *
export function getOrganizationByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    const url = `/crawler/${prototypeId}/organizations/${name}`;
    const headers = makeSignHeader(params);
    return api.get<OrgProfileDto>(url, {headers});
}

// 조직 플랜 & 결제주기 정보 가져오기 *
export function getOrgBillingInfoByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    const url = `/crawler/${prototypeId}/organizations/${name}/billing`;
    const headers = makeSignHeader(params);
    return api.get<OrgBillingDto>(url, {headers});
}

// 조직 결제내역 가져오기 *
export function getBillingHistoriesByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    const url = `/crawler/${prototypeId}/organizations/${name}/billing/histories`;
    const headers = makeSignHeader(params);
    return api.get<OrgBillingHistoryDto[]>(url, {headers});
}

// 조직 구성원 목록 가져오기 *
export function getMembersByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    const url = `/crawler/${prototypeId}/organizations/${name}/members`;
    const headers = makeSignHeader(params);
    return api.get<OrgMemberDto[]>(url, {headers});
}
