import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {BankAccountDto, FindAllBankAccountQueryDto} from '^models/BankAccount/type';
import {bankAccountApi} from '^models/BankAccount/api';
import {bankAccountListResultAtom} from '^models/BankAccount/atom';

export const useBankAccounts = (
    atoms: PagedResourceAtoms<BankAccountDto, FindAllBankAccountQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => bankAccountApi.index(orgId, params),
        buildQuery: (params) => ({
            relations: ['holdingMember', 'creditCards'],
            ...params,
        }),
        getId: 'id',
        mergeMode,
    });
};

export const useBankAccountListForListPage = () => useBankAccounts(bankAccountListResultAtom);
