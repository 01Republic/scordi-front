import {SubscriptionBillingCycleDto} from '^models/Subscription/types/billingCycleType';
import {TypeCast} from '^types/utils/class-transformer';

// // PaymentPlan 결제플랜
// export enum PaymentPlan {
//   free = 'FREE',
//   team = 'TEAM',
//   business = 'BUSINESS',
//   pro = 'PRO',
//   enterprise = 'ENTERPRISE',
// }

export class SubscriptionPaymentPlanDto {
    id: number;
    productId: number;
    name: string;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;
    @TypeCast(() => SubscriptionBillingCycleDto) billingCycles: SubscriptionBillingCycleDto[];
}
