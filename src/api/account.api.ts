import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllAccountsQueryDto, AccountDto, CreateAccountDto, UpdateAccountDto} from '^types/account.type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

const NAMESPACE = 'organizations';
export const accountApi = {
    index(orgId: number, params?: FindAllAccountsQueryDto) {
        const url = `/${NAMESPACE}/${orgId}/accounts`;
        return api.get<Paginated<AccountDto>>(url, {params}).then(paginatedDtoOf(AccountDto));
    },

    show(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/accounts/${id}`;
        return api.get<AccountDto>(url).then(oneDtoOf(AccountDto));
    },

    create(orgId: number, data: CreateAccountDto) {
        const url = `/${NAMESPACE}/${orgId}/accounts`;
        return api.post<AccountDto>(url, data).then(oneDtoOf(AccountDto));
    },

    update(orgId: number, id: number, data: UpdateAccountDto) {
        const url = `/${NAMESPACE}/${orgId}/accounts/${id}`;
        return api.patch<AccountDto>(url, data).then(oneDtoOf(AccountDto));
    },

    destroy(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/accounts/${id}`;
        return api.delete<AccountDto>(url).then(oneDtoOf(AccountDto));
    },
};

export const accountPermissionApi = {
    index(orgId: number, params?: FindAllAccountsQueryDto) {
        const url = `/${NAMESPACE}/${orgId}/accounts/permissions`;
        return api.get<Paginated<AccountDto>>(url, {params}).then(paginatedDtoOf(AccountDto));
    },

    show(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/accounts/permissions/${id}`;
        return api.get<AccountDto>(url).then(oneDtoOf(AccountDto));
    },

    create(orgId: number, data: CreateAccountDto) {
        const url = `/${NAMESPACE}/${orgId}/accounts/permissions`;
        return api.post<AccountDto>(url, data).then(oneDtoOf(AccountDto));
    },

    update(orgId: number, id: number, data: UpdateAccountDto) {
        const url = `/${NAMESPACE}/${orgId}/accounts/permissions/${id}`;
        return api.patch<AccountDto>(url, data).then(oneDtoOf(AccountDto));
    },

    destroy(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/accounts/permissions/${id}`;
        return api.delete<AccountDto>(url).then(oneDtoOf(AccountDto));
    },
};
