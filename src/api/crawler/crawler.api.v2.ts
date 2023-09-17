import {api} from '^api/api';
import {
    WorkspaceBillingDto,
    WorkspaceBillingHistoryDto,
    WorkspaceProfileDto,
    WorkspaceMemberDto,
    LoginDto,
} from '^types/crawler';
import {ConnectResultResponseDto, ConnectWorkspaceResponseDto} from '^types/crawler/connect-result-response.dto';
import CryptoJS from 'crypto-js';

const CRAWLER_SIGN_SECRET = process.env.NEXT_PUBLIC_CRAWLER_SIGN_SECRET as string;
export const makeSignHeader = (params: LoginDto) => {
    const loginData = JSON.stringify(params);
    const encrypted = CryptoJS.AES.encrypt(loginData, CRAWLER_SIGN_SECRET).toString();
    return {'Crawler-Sign': encrypted};
};

export const crawlerApiV2 = {
    getWorkspaces(productId: number, loginQuery: LoginDto) {
        const headers = makeSignHeader(loginQuery);
        const url = `/crawler/${productId}/workspaces`;
        return api.get<ConnectWorkspaceResponseDto>(url, {headers});
    },

    deviseVerification(productId: number, loginQuery: LoginDto, code: string) {
        const headers = makeSignHeader(loginQuery);
        const url = `/crawler/${productId}/workspaces/verify?code=${code}`;
        return api.get<ConnectWorkspaceResponseDto>(url, {headers});
    },

    // 기본 정보
    getWorkspaceProfile(productId: number, accountId: number, key: string) {
        const url = `/crawler/${productId}/workspaces/${key}/profile?syncAccountId=${accountId}`;
        return api.get<WorkspaceProfileDto>(url);
    },

    // 플랜, 결제주기
    getWorkspacePlanAndCycle(productId: number, accountId: number, key: string) {
        const url = `/crawler/${productId}/workspaces/${key}/billing?syncAccountId=${accountId}`;
        return api.get<WorkspaceBillingDto>(url);
    },

    // 결제내역
    getWorkspaceBillingHistories(productId: number, accountId: number, key: string) {
        const url = `/crawler/${productId}/workspaces/${key}/billingHistories?syncAccountId=${accountId}`;
        return api.get<WorkspaceBillingHistoryDto[]>(url);
    },

    // 구성원
    getWorkspaceMembers(productId: number, accountId: number, key: string) {
        const url = `/crawler/${productId}/workspaces/${key}/billingHistories?syncAccountId=${accountId}`;
        return api.get<WorkspaceMemberDto[]>(url);
    },

    getAll(productId: number, accountId: number, key: string) {
        const url = `/crawler/${productId}/workspaces/${key}/all?syncAccountId=${accountId}`;
        return api.get<ConnectResultResponseDto>(url);
    },
};
