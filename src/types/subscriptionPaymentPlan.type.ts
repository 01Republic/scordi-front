import {SubscriptionBillingCycleDto} from '^types/subscriptionBillingCycle.type';

// // PaymentPlan 결제플랜
// export enum PaymentPlan {
//   free = 'FREE',
//   team = 'TEAM',
//   business = 'BUSINESS',
//   pro = 'PRO',
//   enterprise = 'ENTERPRISE',
// }

export type SubscriptionPaymentPlanDto = {
    id: number;
    productId: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    billingCycles: SubscriptionBillingCycleDto[];
};
