import {LoginDto, LoginWithVerify, OrgBillingDto, OrgItemDto, OrgProfileDto} from '^types/crawler';
import {api} from '^api/api';
import {OrgBillingHistoryDto} from '^types/crawler/org-billing-history.dto';
import {OrgMemberDto} from '^types/crawler/org-member.dto';

/**
 * [크롤러] 서비스 연동 API
 */

// OK [Step 1] 서비스에서 연동할 조직 목록을 가져오기 *
// OK [Step 1-1] 조직 목록 가져오기2 (서비스에서 2FA 또는 기기 인증 코드를 요청할때) *
export function getOrganizationListByCrawlerApi(prototypeId: number, params: LoginDto | LoginWithVerify) {
    if ((params as any).verificationCode) {
        return api.get<OrgItemDto[]>(`/crawler/${prototypeId}/organizations/verify`, {params});
    } else {
        return api.get<OrgItemDto[]>(`/crawler/${prototypeId}/organizations`, {params});
    }
}

// [Step 2] 서비스에서 연동할 조직의 세부 정보 가져오기 *
export function getOrganizationByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    return api.get<OrgProfileDto>(`/crawler/${prototypeId}/organizations/${name}`, {params});
}

// 조직 플랜 & 결제주기 정보 가져오기 *
export function getOrgBillingInfoByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    return api.get<OrgBillingDto>(`/crawler/${prototypeId}/organizations/${name}/billing`, {params});
}

// 조직 결제내역 가져오기 *
export function getBillingHistoriesByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    return api.get<OrgBillingHistoryDto[]>(`/crawler/${prototypeId}/organizations/${name}/billing/histories`, {params});
}

// 조직 구성원 목록 가져오기 *
export function getMembersByCrawlerApi(prototypeId: number, name: string, params: LoginDto | LoginWithVerify) {
    return api.get<OrgMemberDto[]>(`/crawler/${prototypeId}/organizations/${name}/members`, {params});
}
