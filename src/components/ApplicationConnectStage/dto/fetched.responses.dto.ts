import { BillingCycleTerm } from '^types/applicationBillingCycle.type';

export type Currency = {
  text: string;
  code: string;
  symbol: string;
  format: string;
  amount: number;
}

export type FetchedProfileDto = {
  provider: string;
  requestSender: string;
  displayName: string;
  description: string;
  profileImageUrl: string;
  publicEmail: string;
  billingEmail: string;
};

export type FetchedOrgPlanAndCycleDto = { // billingInfo
  provider: string;
  requestSender: string;
  planName: string;
  nextPaymentDue: string;
  currentCycleBillAmount: Currency;
  cycleTerm: BillingCycleTerm | null;
  isPerUser: boolean;
  unitPrice: Currency | null;
};
export type FetchedOrgBillingHistoryDto = {};
export type FetchedOrgMemberDto = {};
