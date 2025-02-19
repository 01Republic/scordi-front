import {
    CreateInvoiceAccountDto,
    CreateInvoiceAccountRequestDto,
    CreateInvoiceAccountRequestDto2,
    FindAllInvoiceAccountQueryDto,
    InvoiceAccountDto,
    ReConnectInvoiceAccountRequestDto,
    SyncInvoiceAccountRequestDto,
    UpdateInvoiceAccountDto,
} from '^models/InvoiceAccount/type';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type/TeamInvoiceAccount.dto';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';

const NAMESPACE = 'organizations';

export const invoiceAccountApi = {
    index(orgId: number, params?: FindAllInvoiceAccountQueryDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts`;
        return api.get<Paginated<InvoiceAccountDto>>(url, {params}).then(paginatedDtoOf(InvoiceAccountDto));
    },

    show(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}`;
        return api.get<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    create(orgId: number, data: CreateInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    destroy(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}`;
        return api.delete<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    draft(data: CreateInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/0/invoice_accounts/draft`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    // InvoiceAccount 토큰 만료여부 체크
    isValidToken(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}/isValidToken`;
        return api.get<boolean>(url);
    },

    sync(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}/sync`;
        return api.patch<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    renew(orgId: number, id: number, data: SyncInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts/${id}/re-sync`;
        return api.patch<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    // V2

    createV2(orgId: number, data: CreateInvoiceAccountRequestDto2) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v2`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    draftV2(data: CreateInvoiceAccountRequestDto2) {
        const url = `/${NAMESPACE}/0/invoice_accounts_v2/draft`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    syncV2(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v2/${id}/sync`;
        return api.patch<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    // InvoiceAccount Sync - TokenData를 다시 받아옵니다.
    reConnect(orgId: number, id: number, data: ReConnectInvoiceAccountRequestDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v2/${id}/re-connect`;
        return api.patch<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    // v3

    createV3(orgId: number, data: CreateInvoiceAccountDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v3`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    upsertByCode(orgId: number, data: CreateInvoiceAccountRequestDto2) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v3/by-code`;
        return api.post<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    updateV3(orgId: number, id: number, data: UpdateInvoiceAccountDto) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v3/${id}`;
        return api.patch<InvoiceAccountDto>(url, data).then(oneDtoOf(InvoiceAccountDto));
    },

    destroyV3(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/invoice_accounts_v3/${id}`;
        return api.delete<InvoiceAccountDto>(url).then(oneDtoOf(InvoiceAccountDto));
    },

    teamsApi: {
        // 연결된 팀 목록
        index(invoiceAccountId: number, params?: FindAllTeamQueryDto) {
            const url = `/invoice-accounts/${invoiceAccountId}/teams`;
            return api.get(url, {params}).then(paginatedDtoOf(TeamDto));
        },

        // 팀 연결
        create(invoiceAccountId: number, teamId: number) {
            const url = `/invoice-accounts/${invoiceAccountId}/teams/${teamId}`;
            return api.post(url).then(oneDtoOf(TeamInvoiceAccountDto));
        },

        // 팀 연결 해제
        destroy(invoiceAccountId: number, teamId: number) {
            const url = `/invoice-accounts/${invoiceAccountId}/teams/${teamId}`;
            return api.delete<void>(url);
        },
    },

    // [인보이스] 인보이스 계정 > 구독연결 API
    subscriptionsApi: {
        // 연결된 구독 목록
        index(invoiceAccountId: number, params?: FindAllSubscriptionsQuery) {
            const url = `/invoice_accounts/${invoiceAccountId}/subscriptions`;
            return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
        },

        // 연결 가능한 구독 목록
        addable(invoiceAccountId: number, params?: FindAllSubscriptionsQuery) {
            const url = `/invoice_accounts/${invoiceAccountId}/subscriptions/addable`;
            return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
        },

        // 구독 연결
        create(invoiceAccountId: number, subscriptionId: number) {
            const url = `/invoice_accounts/${invoiceAccountId}/subscriptions/${subscriptionId}`;
            return api.post(url).then(oneDtoOf(SubscriptionDto));
        },

        // 구독 연결 해제
        destroy(invoiceAccountId: number, subscriptionId: number) {
            const url = `/invoice_accounts/${invoiceAccountId}/subscriptions/${subscriptionId}`;
            return api.delete<void>(url);
        },
    },
};

export * from './invoiceAccountGmailTestApi';
