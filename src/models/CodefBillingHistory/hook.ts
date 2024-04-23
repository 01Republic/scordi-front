import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto} from '^models/CodefBillingHistory/type';
import {codefBillingHistoriesAdminApi} from '^models/CodefBillingHistory/api';
import {codefBillingHistoriesAdminAtom} from '^models/CodefBillingHistory/atom';

export const useAdminCodefBillingHistories = () => useCodefBillingHistoriesAdmin(codefBillingHistoriesAdminAtom);

const useCodefBillingHistoriesAdmin = (
    atoms: PagedResourceAtoms<CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: false,
        endpoint: (params) => codefBillingHistoriesAdminApi.index(params),
        getId: 'id',
        mergeMode,
    });
};
