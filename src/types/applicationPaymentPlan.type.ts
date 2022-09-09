import { ApplicationBillingCycleDto } from '^types/applicationBillingCycle.type';

// // PaymentPlan 결제플랜
// export enum PaymentPlan {
//   free = 'FREE',
//   team = 'TEAM',
//   business = 'BUSINESS',
//   pro = 'PRO',
//   enterprise = 'ENTERPRISE',
// }

export type ApplicationPaymentPlanDto = {
  id: number;
  prototypeId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  billingCycles: ApplicationBillingCycleDto[];
}
