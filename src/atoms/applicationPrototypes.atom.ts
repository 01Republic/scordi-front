import {atom, selector} from 'recoil';
import {ApplicationPrototypeDto, FindAllAppPrototypeQuery} from '^types/applicationPrototype.type';
import {ApplicationPaymentPlanDto} from '^types/applicationPaymentPlan.type';
import {ApplicationBillingCycleDto} from '^types/applicationBillingCycle.type';
import {getApplicationPrototype, getApplicationPrototypes} from '^api/applicationPrototype.api';
import {errorNotify} from '^utils/toast-notify';
import {prototypeIdParamsState} from '^atoms/common';

export const applicationPrototypesAtom = atom({
    key: 'applicationPrototypes',
    default: [] as ApplicationPrototypeDto[],
});

export const applicationPrototypeAtom = atom({
    key: 'applicationPrototype',
    default: null as ApplicationPrototypeDto | null,
});

export const paymentPlanForCreateFlowAtom = atom({
    key: '@createFlow/paymentPlan',
    default: null as ApplicationPaymentPlanDto | null,
});

export const billingCycleForCreateFlowAtom = atom({
    key: '@createFlow/billingCycle',
    default: null as ApplicationBillingCycleDto | null,
});

/**
 * ApplicationPrototypes Basic CRUD
 */

export const getPrototypesParamsState = atom<FindAllAppPrototypeQuery>({
    key: 'getPrototypesParamsState',
    default: {},
});

export const getPrototypesQuery = selector({
    key: 'getPrototypesQuery',
    get: async ({get}) => {
        const params = get(getPrototypesParamsState);

        try {
            const res = await getApplicationPrototypes({
                ...params,
                isLive: params.isLive ?? true,
                itemsPerPage: 500,
            });
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

export const getPrototypeQuery = selector({
    key: 'getPrototypeQuery',
    get: async ({get}) => {
        const id = get(prototypeIdParamsState);
        if (isNaN(id)) return;

        try {
            const res = await getApplicationPrototype(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});
