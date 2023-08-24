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
export const prototypesState = atom({
    key: 'prototypesState',
    default: [] as ApplicationPrototypeDto[],
});

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

export const getPrototypeQueryTrigger = atom({
    key: 'getPrototypeQueryTrigger',
    default: 0,
});

/**
 * getPrototypeQuery 는 현재, 동 페이지 내에서 주제로 사용되는 prototype 만을 취급 할 수 있습니다.
 * 이는 현재 버전이 "Current" 성격을 지닌다고 볼 수 있습니다.
 * 따라서 getPrototypeQuery 는 getCurrentPrototypeQuery 로 변경되어야 합니다.
 * 또, 일반적으로 api 호출시에 사용할 올바른 getPrototypeQuery 를 만들어야 합니다.
 */
export const getPrototypeQuery = selector({
    key: 'getPrototypeQuery',
    get: async ({get}) => {
        get(getPrototypeQueryTrigger);
        const id = get(prototypeIdParamsState);
        if (isNaN(id)) return;

        try {
            const res = await getApplicationPrototype(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({set}) => {
        set(getPrototypeQueryTrigger, (v) => v + 1);
    },
});

export type PrototypePostDto = {
    thumbnailUrl?: string | null;
    logoImgUrl?: string | null;
    homepageUrl?: string | null;
    title: string;
    subTitle: string;
    tagNames: string[];
};

export const getPrototypePostContent = atom({
    key: 'prototypePostContent',
    default: {} as PrototypePostDto,
});
