import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {FindAllAccountQueryForAdminDto} from '^models/CodefAccount/type/find-all-account.query.for-admin.dto';
import {codefAccountAdminApi} from '^models/CodefAccount/api';
import {codefAccountsAdminAtom} from '^models/CodefAccount/atom';

/***
 * ADMIN
 */

export const useAdminCodefAccounts = () => useCodefAccountsAdmin(codefAccountsAdminAtom);

const useCodefAccountsAdmin = (
    atoms: PagedResourceAtoms<CodefAccountDto, FindAllAccountQueryForAdminDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefAccountAdminApi.index(params),
        getId: 'id',
        mergeMode,
    });
};
