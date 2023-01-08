import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {prototypeIdParamsState} from '^atoms/common';
import {
    applicationPrototypeAtom,
    applicationPrototypesAtom,
    billingCycleForCreateFlowAtom,
    getPrototypeQuery,
    getPrototypesQuery,
    paymentPlanForCreateFlowAtom,
} from '^atoms/applicationPrototypes.atom';
import {useEffect, useState} from 'react';
import {ApplicationPrototypeDto, FindAllAppPrototypeQuery} from '^types/applicationPrototype.type';
import {getApplicationPrototype, getApplicationPrototypes} from '^api/applicationPrototype.api';
import {errorNotify} from '^utils/toast-notify';
import {ApplicationPaymentPlanDto} from '^types/applicationPaymentPlan.type';
import {useRouter} from 'next/router';

export const useApplicationPrototypes = () => {
    const result = useRecoilValue(getPrototypesQuery);
    return result || {items: undefined, pagination: {}};
};

export const useApplicationPrototype = () => useRecoilValue(getPrototypeQuery);

// export const useApplicationPrototypes2 = (deps: any[]) => {
//     const [page, setPage] = useState<number>(0);
//     const [totalPage, setTotalPage] = useState<number>(0);
//     const [totalItemCount, setTotalItemCount] = useState<number>(0);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [list, setList] = useRecoilState(applicationPrototypesAtom);
//
//     const fetch = (params: FindAllAppPrototypeQuery = {}) => {
//         params.where ||= {};
//         params.isLive ??= true;
//         setIsLoading(true);
//         getApplicationPrototypes(params)
//             .then(({data}) => {
//                 setPage(data.pagination.currentPage);
//                 setTotalPage(data.pagination.totalPage);
//                 setTotalItemCount(data.pagination.totalItemCount);
//                 setList(data.items);
//             })
//             .catch(errorNotify)
//             .finally(() => setIsLoading(false));
//     };
//
//     useEffect(() => {
//         fetch();
//     }, [...(deps ?? [])]);
//
//     return {
//         data: list,
//         fetch,
//         isLoading,
//         pagination: {
//             currentPage: page,
//             totalPage,
//             totalItemCount,
//         },
//     };
// };
//
// export const useApplicationPrototype2 = (id: number | null, deps: any[]) => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [prototype, setPrototype] = useRecoilState(applicationPrototypeAtom);
//
//     const fetchApplicationPrototype = (id: number) => {
//         setIsLoading(true);
//         getApplicationPrototype(id)
//             .then(({data}) => {
//                 setPrototype(data);
//             })
//             .catch(errorNotify)
//             .finally(() => setIsLoading(false));
//     };
//
//     useEffect(() => {
//         if (typeof id === 'number') fetchApplicationPrototype(id);
//     }, [id, ...(deps ?? [])]);
//
//     return {prototype, setPrototype, isLoading, fetchApplicationPrototype};
// };

export const usePaymentPlanForCreateFlow = (proto: ApplicationPrototypeDto | null | undefined, id: number) => {
    const [paymentPlan, setPaymentPlan] = useRecoilState(paymentPlanForCreateFlowAtom);

    useEffect(() => {
        if (!proto || isNaN(id)) return;
        const plan = proto.paymentPlans.find((plan) => plan.id === id);
        setPaymentPlan(plan || null);
    }, [proto, id]);

    return {paymentPlan, setPaymentPlan};
};

export const useBillingCycleForCreateFlow = (plan: ApplicationPaymentPlanDto | null | undefined, id: number) => {
    const [billingCycle, setBillingCycle] = useRecoilState(billingCycleForCreateFlowAtom);

    useEffect(() => {
        if (!plan || isNaN(id)) return;
        const cycle = plan.billingCycles.find((plan) => plan.id === id);
        setBillingCycle(cycle || null);
    }, [plan, id]);

    return {billingCycle, setBillingCycle};
};

export const useCreateFlow = () => {
    const router = useRouter();
    const prototypeId = Number(router.query.prototypeId);
    const planId = Number(router.query.planId);
    const cycleId = Number(router.query.cycleId);
    const prototype = useApplicationPrototype();
    const planHook = usePaymentPlanForCreateFlow(prototype, planId);
    const cycleHook = useBillingCycleForCreateFlow(planHook.paymentPlan, cycleId);
    const setPrototypeIdParam = useSetRecoilState(prototypeIdParamsState);

    useEffect(() => {
        setPrototypeIdParam(prototypeId);
    }, [prototypeId]);

    return {
        prototypeId,
        paymentPlanId: planId,
        billingCycleId: cycleId,
        prototype,
        ...planHook,
        ...cycleHook,
    };
};
