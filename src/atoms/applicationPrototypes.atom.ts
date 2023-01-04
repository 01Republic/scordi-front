import {atom} from 'recoil';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {ApplicationPaymentPlanDto} from '^types/applicationPaymentPlan.type';
import {ApplicationBillingCycleDto} from '^types/applicationBillingCycle.type';

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
