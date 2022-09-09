// BillingCycle 결제주기
export enum BillingCycle {
  undef = 'UNDEF',
  monthly = 'MONTHLY',
  yearly = 'YEARLY', // Annually
  other = 'OTHER',
}

export enum BillingCycleTerm {
  monthly = 'MONTHLY',
  yearly = 'YEARLY',
}

export type ApplicationBillingCycleDto = {
  id: number; // ID
  prototypeId: number; // 프로토타입 ID
  paymentPlanId: number; // 결제플랜 ID
  unitPrice: number; // 단위가격
  term: BillingCycleTerm | null; // 주기
  isPerUser: boolean; // 회원당 과금 여부
  createdAt: Date; // 생성일시
  updatedAt: Date; // 수정일시
}

export function t_BillingCycleTerm(v: BillingCycleTerm | null) {
  switch (v) {
    case null:
      return '무관';
    case BillingCycleTerm.monthly:
      return '월';
    case BillingCycleTerm.yearly:
      return '연';
    default:
      return '?';
  }
}
