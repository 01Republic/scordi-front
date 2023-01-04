import {useRecoilState} from 'recoil';
import {
    applicationPrototypeAtom,
    applicationPrototypesAtom,
    billingCycleForCreateFlowAtom,
    paymentPlanForCreateFlowAtom,
} from '^atoms/applicationPrototypes.atom';
import {useEffect, useState} from 'react';
import {ApplicationPrototypeDto, FindAllAppPrototypeQuery} from '^types/applicationPrototype.type';
import {getApplicationPrototype, getApplicationPrototypes} from '^api/applicationPrototype.api';
import {errorNotify} from '^utils/toast-notify';
import {ApplicationPaymentPlanDto} from '^types/applicationPaymentPlan.type';
import {useRouter} from 'next/router';

export const useApplicationPrototypes = (deps: any[]) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [prototypes, setPrototypes] = useRecoilState(applicationPrototypesAtom);

    const fetchApplicationPrototypes = ({page = 1, itemsPerPage = 30, ...params}: FindAllAppPrototypeQuery) => {
        setIsLoading(true);
        getApplicationPrototypes(params)
            .then(({data}) => {
                setPrototypes(data.items);
            })
            .catch(errorNotify)
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchApplicationPrototypes({
            page: 1,
            itemsPerPage: 30,
        });
    }, [...(deps ?? [])]);

    return {prototypes, setPrototypes, isLoading, fetchApplicationPrototypes};
};

export const useApplicationPrototype = (id: number | null, deps: any[]) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [prototype, setPrototype] = useRecoilState(applicationPrototypeAtom);

    const fetchApplicationPrototype = (id: number) => {
        setIsLoading(true);
        getApplicationPrototype(id)
            .then(({data}) => {
                setPrototype(data);
            })
            .catch(errorNotify)
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (typeof id === 'number') fetchApplicationPrototype(id);
    }, [id, ...(deps ?? [])]);

    return {prototype, setPrototype, isLoading, fetchApplicationPrototype};
};

export const usePaymentPlanForCreateFlow = (proto: ApplicationPrototypeDto | null, id: number | null) => {
    const [paymentPlan, setPaymentPlan] = useRecoilState(paymentPlanForCreateFlowAtom);

    useEffect(() => {
        if (!proto || !id) return;
        const plan = proto.paymentPlans.find((plan) => plan.id === id);
        setPaymentPlan(plan || null);
    }, [proto, id]);

    return {paymentPlan, setPaymentPlan};
};

export const useBillingCycleForCreateFlow = (plan: ApplicationPaymentPlanDto | null, id: number | null) => {
    const [billingCycle, setBillingCycle] = useRecoilState(billingCycleForCreateFlowAtom);

    useEffect(() => {
        if (!plan || !id) return;
        const cycle = plan.billingCycles.find((plan) => plan.id === id);
        setBillingCycle(cycle || null);
    }, [plan, id]);

    return {billingCycle, setBillingCycle};
};

export const useCreateFlow = () => {
    const router = useRouter();
    const prototypeId = Number(router.query.prototypeId) || null;
    const planId = Number(router.query.planId) || null;
    const cycleId = Number(router.query.cycleId) || null;
    const protoHook = useApplicationPrototype(prototypeId, []);
    const planHook = usePaymentPlanForCreateFlow(protoHook.prototype, planId);
    const cycleHook = useBillingCycleForCreateFlow(planHook.paymentPlan, cycleId);

    return {
        prototypeId,
        paymentPlanId: planId,
        billingCycleId: cycleId,
        ...protoHook,
        ...planHook,
        ...cycleHook,
    };
};
