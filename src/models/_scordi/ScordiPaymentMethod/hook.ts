import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {scordiPaymentMethodApi} from './api';
import {FindAllScordiPaymentMethodQueryDto, PaymentProvider, ScordiPaymentMethodDto} from './type';
import {scordiPaymentMethodsInSettingPageAtoms} from './atom';

// 설정 - 결제관리 페이지 / 카드정보 섹션에서 사용
export const useScordiPaymentMethodsInSettingPage = () =>
    useScordiPaymentMethods(scordiPaymentMethodsInSettingPageAtoms);

const useScordiPaymentMethods = (
    atoms: PagedResourceAtoms<ScordiPaymentMethodDto, FindAllScordiPaymentMethodQueryDto>,
    mergeMode = false,
) => {
    const {search, ...methods} = usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => scordiPaymentMethodApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });

    const search2 = (params: FindAllScordiPaymentMethodQueryDto = {}) => {
        return search({
            ...params,
            where: {provider: PaymentProvider.TossPayment, ...params.where},
        });
    };

    const fetchAll = () => {
        return search2({
            where: {},
            order: {isActive: 'DESC', id: 'DESC'},
            itemsPerPage: 0,
        });
    };

    return {...methods, search: search2, fetchAll};
};
