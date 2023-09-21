import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllAccountsQueryDto, AccountDto, CreateAccountDto, UpdateAccountDto} from '^types/account.type';

export const accountApi = {
    index(orgId: number, params?: FindAllAccountsQueryDto) {
        const url = `/organizations/${orgId}/accounts`;
        return api.get<Paginated<AccountDto>>(url, {params});
    },

    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/accounts/${id}`;
        return api.get<AccountDto>(url);
    },

    create(orgId: number, data: CreateAccountDto) {
        const url = `/organizations/${orgId}/accounts`;
        return api.post<AccountDto>(url, data);
    },

    update(orgId: number, id: number, data: UpdateAccountDto) {
        const url = `/organizations/${orgId}/accounts/${id}`;
        return api.patch<AccountDto>(url, data);
    },

    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/accounts/${id}`;
        return api.delete<AccountDto>(url);
    },
};

export const accountPermissionApi = {
    index(orgId: number, params?: FindAllAccountsQueryDto) {
        const url = `/organizations/${orgId}/accounts/permissions`;
        return api.get<Paginated<AccountDto>>(url, {params});
    },

    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/accounts/permissions/${id}`;
        return api.get<AccountDto>(url);
    },

    create(orgId: number, data: CreateAccountDto) {
        const url = `/organizations/${orgId}/accounts/permissions`;
        return api.post<AccountDto>(url, data);
    },

    update(orgId: number, id: number, data: UpdateAccountDto) {
        const url = `/organizations/${orgId}/accounts/permissions/${id}`;
        return api.patch<AccountDto>(url, data);
    },

    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/accounts/permissions/${id}`;
        return api.delete<AccountDto>(url);
    },
};
