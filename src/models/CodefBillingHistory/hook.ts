import {useQuery} from '@tanstack/react-query';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {codefBillingHistoriesAdminAtom} from '^models/CodefBillingHistory/atom';
import {codefBillingHistoriesAdminApi, codefBillingHistoriesApi} from '^models/CodefBillingHistory/api';
import {CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto} from '^models/CodefBillingHistory/type';

export const useAdminCodefBillingHistories = () => useCodefBillingHistoriesAdmin(codefBillingHistoriesAdminAtom);

// 코드에프카드 - 가장 오래된 결제내역 단건 조회
export const useOldestCodefBillingHistory = (orgId: number, codefId?: number) => {
    return useQuery<CodefBillingHistoryDto, Error>({
        queryKey: ['oldest-codef-billing-history', orgId, codefId],
        queryFn: () => codefBillingHistoriesApi.index(orgId, codefId!).then((res) => res.data),
        enabled: !!orgId && !!codefId,
    });
};

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
