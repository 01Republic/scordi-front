import {scordiPaymentsInSettingPageAtoms} from '^models/_scordi/ScordiPayment/atom';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllScordiPaymentQueryDto, ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
import {scordiPaymentsApi} from '^models/_scordi/ScordiPayment/api';

// 설정 - 결제관리 페이지 / 결제내역 섹션에서 사용
export const useScordiPaymentsInSettingPage = () => useScordiPayments(scordiPaymentsInSettingPageAtoms);

const useScordiPayments = (
    atoms: PagedResourceAtoms<ScordiPaymentDto, FindAllScordiPaymentQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => scordiPaymentsApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};
