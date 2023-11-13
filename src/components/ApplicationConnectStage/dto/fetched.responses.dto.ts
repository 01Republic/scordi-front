import {BillingCycleTerm} from '^types/subscriptionBillingCycle.type';

export type Currency = {
    text: string;
    code: string;
    symbol: string;
    format: string;
    amount: number;
};

export class FetchedProfileDto {
    provider: string;
    requestSender: string;
    displayName: string;
    description: string;
    profileImageUrl: string;
    publicEmail: string;
    billingEmail: string;
}

export class FetchedOrgPlanAndCycleDto {
    // billingInfo
    provider: string;
    requestSender: string;
    planName: string;
    nextPaymentDue: string;
    currentCycleBillAmount: Currency;
    cycleTerm: BillingCycleTerm | null;
    isPerUser: boolean;
    paidMemberCount: number;
    usedMemberCount: number;
    unitPrice: Currency | null;
}
export class FetchedOrgBillingHistoryDto {}
export class FetchedOrgMemberDto {}

export class InvoiceDataDto {
    issuedAt: string;
    displayName: string;
    billingEmail: string;
    planName: string;
    currentCycleBillAmount: string;
    cycleTerm: BillingCycleTerm | null;
    isPerUser: boolean;
    unitPrice: string;
    paidMemberCount: number;
}
